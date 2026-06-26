// East Bay school attendance map.
// Oakland (OUSD) boundaries: official 2025-26 ArcGIS FeatureServer, bundled by
// script/fetch-ousd.mjs into the .geojson files below. Non-Oakland districts:
// NCES School Attendance Boundary Survey (SABS) 2015-16, bundled by
// script/fetch-sabs.mjs into sabsAttendance.ts.

import { useState, useEffect, useRef } from "react";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

import elemRaw from "@/data/ousd-elementary-boundaries.geojson?raw";
import midRaw from "@/data/ousd-middle-boundaries.geojson?raw";
import highRaw from "@/data/ousd-high-boundaries.geojson?raw";
import schoolDataRaw from "@/data/east-bay-schools.json?raw";
import { sabsAttendance } from "@/data/sabsAttendance";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

type LatLng = { lat: number; lng: number };
type Level = "elementary" | "middle" | "high";

const elementaryFC = JSON.parse(elemRaw);
const middleFC = JSON.parse(midRaw);
const highFC = JSON.parse(highRaw);

const LEVELS: { key: Level; label: string; color: string; fc: any }[] = [
  { key: "elementary", label: "Elementary", color: "#2E7D32", fc: elementaryFC }, // green
  { key: "middle", label: "Middle", color: "#1565C0", fc: middleFC }, // blue
  { key: "high", label: "High", color: "#C62828", fc: highFC }, // red
];

const LEVEL_COLOR: Record<Level, string> = {
  elementary: "#2E7D32",
  middle: "#1565C0",
  high: "#C62828",
};

// East Bay schools verified against GreatSchools ("Realtor510 — East Bay School
// Data v2"). Flattened to one row per school, carrying its district along.
const RATED_SCHOOLS: any[] = JSON.parse(schoolDataRaw).districts.flatMap((d: any) =>
  d.schools.map((s: any) => ({ ...s, district: d.name, finderUrl: d.finderUrl }))
);

// NCES SABS level code -> our toggle level. "4" (combined 6-12, e.g. Encinal
// Jr/Sr) is shown with the high layer.
const SABS_LEVEL: Record<string, Level> = { "1": "elementary", "2": "middle", "3": "high", "4": "high" };

// Non-Oakland attendance zones, tagged with our level so the same toggles drive
// them. (Oakland keeps its newer 2025-26 OUSD boundaries above.)
const SABS_ZONES = sabsAttendance.map(z => ({ ...z, lvl: SABS_LEVEL[z.level] ?? "high" }));

// GeoJSON Polygon/MultiPolygon -> array of Google Maps paths ([lng,lat] -> {lat,lng}).
function toPaths(geometry: any): LatLng[][] {
  if (!geometry) return [];
  const polys = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
  const paths: LatLng[][] = [];
  for (const poly of polys) {
    for (const ring of poly) {
      paths.push(ring.map(([lng, lat]: number[]) => ({ lat, lng })));
    }
  }
  return paths;
}

// Assigned school name at a point ([lng,lat]) for one boundary FeatureCollection.
function assignedSchool(lng: number, lat: number, fc: any): string | null {
  const f = fc.features.find((ft: any) => booleanPointInPolygon([lng, lat], ft));
  return f ? f.properties.school : null;
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function greatSchoolsUrl(name: string): string {
  return `https://www.greatschools.org/search/search.page?q=${encodeURIComponent(titleCase(name) + " Oakland CA")}`;
}

// Best-effort city from a SABS district name, for the GreatSchools search query.
function districtCity(district: string): string {
  if (district === "West Contra Costa Unified") return "El Cerrito";
  if (district === "Acalanes Union High") return ""; // spans Lamorinda
  return district.replace(/\s+(City\s+)?(Unified|Union Elementary|Union High|Elementary).*$/i, "").trim();
}

function sabsSchoolUrl(name: string, district: string): string {
  const q = `${titleCase(name)} ${districtCity(district)} CA`.replace(/\s+/g, " ").trim();
  return `https://www.greatschools.org/search/search.page?q=${encodeURIComponent(q)}`;
}

// City for a rated school — explicit field, else parsed from its address.
function cityOf(s: any): string {
  if (s.city) return s.city;
  const m = /,\s*([^,]+?)\s+CA\b/.exec(s.address || "");
  return m ? m[1].trim() : "CA";
}

function ratedSchoolUrl(s: any): string {
  return `https://www.greatschools.org/search/search.page?q=${encodeURIComponent(s.name + " " + cityOf(s))}`;
}

// A map pin shaped like a GreatSchools score chip: the rating number inside a
// circle, colored by school level. Rendered as an inline SVG data URI.
function scoreIcon(g: any, rating: number, color: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
    `<circle cx="16" cy="16" r="13" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>` +
    `<text x="16" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff">${rating}</text>` +
    `</svg>`;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new g.maps.Size(32, 32),
    anchor: new g.maps.Point(16, 16),
  };
}

export default function SchoolMap() {
  const [visible, setVisible] = useState<Record<Level, boolean>>({
    elementary: true,
    middle: false,
    high: false,
  });
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [minScore, setMinScore] = useState(0); // 0 = show all; otherwise minimum GreatSchools rating to show

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const polygonsRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);
  const searchMarkerRef = useRef<any>(null);

  useEffect(() => {
    if ((window as any).google) { initMap(); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  // Redraw boundary polygons whenever the level toggles change.
  useEffect(() => {
    if (mapInstanceRef.current) drawPolygons();
  }, [visible]);

  // Redraw the school dots whenever the minimum-score filter changes.
  useEffect(() => {
    if (mapInstanceRef.current) drawPins();
  }, [minScore]);

  function initMap() {
    if (!mapRef.current) return;
    const g = (window as any).google;
    mapInstanceRef.current = new g.maps.Map(mapRef.current, {
      center: { lat: 37.79, lng: -122.20 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      // Muted grey basemap so the colored attendance outlines stand out.
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
        { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e0e0e0" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#e3e8ea" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
      ],
    });
    geocoderRef.current = new g.maps.Geocoder();
    infoWindowRef.current = new g.maps.InfoWindow();
    drawPins();
    drawPolygons();

    // Frame the full set of rated schools (East Bay-wide, beyond Oakland).
    const bounds = new g.maps.LatLngBounds();
    RATED_SCHOOLS.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
    mapInstanceRef.current.fitBounds(bounds, 48);
  }

  function drawPolygons() {
    const g = (window as any).google;
    polygonsRef.current.forEach(p => p.setMap(null));
    polygonsRef.current = [];
    for (const level of LEVELS) {
      if (!visible[level.key]) continue;
      for (const feature of level.fc.features) {
        const polygon = new g.maps.Polygon({
          paths: toPaths(feature.geometry),
          strokeColor: level.color,
          strokeOpacity: 0.95,
          strokeWeight: 2.5,
          fillColor: level.color,
          fillOpacity: 0, // outline only — interior stays clickable
          map: mapInstanceRef.current,
        });
        polygon.addListener("click", (e: any) => {
          const name = feature.properties.school;
          infoWindowRef.current.setContent(
            `<div style="font-family:Arial,sans-serif;max-width:220px">
               <div style="font-weight:700;font-size:14px;margin-bottom:2px">${titleCase(name)}</div>
               <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">${level.label} attendance area</div>
               <a href="${greatSchoolsUrl(name)}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:${level.color};font-weight:600">GreatSchools profile →</a>
             </div>`
          );
          infoWindowRef.current.setPosition(e.latLng);
          infoWindowRef.current.open(mapInstanceRef.current);
        });
        polygonsRef.current.push(polygon);
      }
    }

    // Non-Oakland district attendance zones (NCES SABS 2015-16).
    for (const z of SABS_ZONES) {
      if (!visible[z.lvl]) continue;
      const color = LEVEL_COLOR[z.lvl];
      const paths = z.rings.map(ring => ring.map(([lng, lat]) => ({ lat, lng })));
      const polygon = new g.maps.Polygon({
        paths,
        strokeColor: color,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0, // outline only
        map: mapInstanceRef.current,
      });
      polygon.addListener("click", (e: any) => {
        const levelLabel = z.lvl.charAt(0).toUpperCase() + z.lvl.slice(1);
        infoWindowRef.current.setContent(
          `<div style="font-family:Arial,sans-serif;max-width:230px">
             <div style="font-weight:700;font-size:14px;margin-bottom:2px">${titleCase(z.name)}</div>
             <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">${levelLabel} attendance area</div>
             <div style="font-size:11px;color:#999;margin-bottom:6px">${z.district}</div>
             <a href="${sabsSchoolUrl(z.name, z.district)}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:${color};font-weight:600">GreatSchools profile →</a>
           </div>`
        );
        infoWindowRef.current.setPosition(e.latLng);
        infoWindowRef.current.open(mapInstanceRef.current);
      });
      polygonsRef.current.push(polygon);
    }
  }

  function drawPins() {
    const g = (window as any).google;
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    for (const s of RATED_SCHOOLS) {
      if (s.greatschools_rating < minScore) continue; // hide schools below the chosen minimum
      const color = LEVEL_COLOR[s.level as Level] ?? "#555";
      const marker = new g.maps.Marker({
        position: { lat: s.lat, lng: s.lng },
        map: mapInstanceRef.current,
        title: `${s.name} — GreatSchools ${s.greatschools_rating}/10`,
        icon: scoreIcon(g, s.greatschools_rating, color),
        zIndex: s.greatschools_rating, // higher-rated dots sit on top when overlapping
      });
      marker.addListener("click", () => {
        const levelLabel = s.level.charAt(0).toUpperCase() + s.level.slice(1);
        infoWindowRef.current.setContent(
          `<div style="font-family:Arial,sans-serif;max-width:240px">
             <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
               <span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${color};color:#fff;font-weight:700;font-size:14px;flex:none">${s.greatschools_rating}</span>
               <span style="font-weight:700;font-size:14px;line-height:1.2">${s.name}</span>
             </div>
             <div style="font-size:11px;color:#666;margin-bottom:2px">${levelLabel}${s.grades ? " · " + s.grades : ""} · GreatSchools ${s.greatschools_rating}/10</div>
             <div style="font-size:11px;color:#999;margin-bottom:6px">${s.district}</div>
             ${s.address ? `<div style="font-size:11px;color:#888;margin-bottom:6px">${s.address}</div>` : ""}
             ${s.note ? `<div style="font-size:11px;color:#555;font-style:italic;margin-bottom:6px">${s.note}</div>` : ""}
             <a href="${ratedSchoolUrl(s)}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:${color};font-weight:600;text-decoration:none">GreatSchools profile →</a>
           </div>`
        );
        infoWindowRef.current.setPosition({ lat: s.lat, lng: s.lng });
        infoWindowRef.current.open(mapInstanceRef.current);
      });
      markersRef.current.push(marker);
    }
  }

  function toggle(level: Level) {
    setVisible(v => ({ ...v, [level]: !v[level] }));
  }

  function lookupAddress() {
    if (!address.trim() || !geocoderRef.current) return;
    setLoading(true);
    setReport(null);
    geocoderRef.current.geocode({ address: `${address}, Oakland, CA` }, (results: any, status: any) => {
      setLoading(false);
      if (status !== "OK" || !results[0]) {
        setReport({ error: "Address not found. Try a full Oakland address like '3670 Penniman Ave, Oakland CA'." });
        return;
      }
      const loc = results[0].geometry.location;
      const lat = loc.lat();
      const lng = loc.lng();

      const elementary = assignedSchool(lng, lat, elementaryFC);
      const middle = assignedSchool(lng, lat, middleFC);
      const high = assignedSchool(lng, lat, highFC);

      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(14);
      const g = (window as any).google;
      if (searchMarkerRef.current) searchMarkerRef.current.setMap(null);
      searchMarkerRef.current = new g.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        icon: { path: g.maps.SymbolPath.CIRCLE, scale: 7, fillColor: "#000", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2 },
      });

      if (elementary || middle || high) {
        setReport({ address: results[0].formatted_address, elementary, middle, high });
      } else {
        setReport({ address: results[0].formatted_address, outside: true });
      }
    });
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#1A1A1A", marginBottom: "8px" }}>
        East Bay School Ratings Map
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px", lineHeight: 1.6 }}>
        Every dot is a school, labeled with its <strong>GreatSchools rating (1–10)</strong> and colored by level — <span style={{ color: "#2E7D32", fontWeight: 600 }}>elementary</span>, <span style={{ color: "#1565C0", fontWeight: 600 }}>middle</span>, <span style={{ color: "#C62828", fontWeight: 600 }}>high</span>. Click any dot for details and a link to its full GreatSchools profile. Toggle the attendance boundaries below to see which school serves which area, or enter an Oakland address to find its assigned OUSD schools.
      </p>
      <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "20px" }}>
        ⚠️ Ratings from GreatSchools.org. Boundaries: Oakland (OUSD) is official 2025–26 data; other districts are from the NCES School Attendance Boundary Survey (2015–16) and may be out of date. Ratings and assignments change over time and some addresses have options/exceptions — always confirm directly with the school or district before relying on this.
      </p>

      {/* Numbered-dot legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "12px", color: "#666" }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#2E7D32", color: "#fff", fontWeight: 700, fontSize: "12px", flex: "none" }}>9</span>
        <span>Number = GreatSchools rating, out of 10. Click a dot for the school's details.</span>
      </div>

      {/* Layer toggles */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {LEVELS.map(level => {
          const on = visible[level.key];
          return (
            <button key={level.key} onClick={() => toggle(level.key)}
              style={{
                padding: "10px 18px", borderRadius: "4px", cursor: "pointer",
                fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                border: `2px solid ${level.color}`,
                background: on ? level.color : "transparent",
                color: on ? "#fff" : level.color,
              }}>
              {on ? "● " : "○ "}{level.label}
            </button>
          );
        })}

        <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#666" }}>
          Min rating
          <select value={minScore} onChange={e => setMinScore(Number(e.target.value))}
            style={{ padding: "9px 12px", borderRadius: "4px", border: "1px solid #CFCFCF", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", background: "#fff", cursor: "pointer" }}>
            <option value={0}>All schools</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
            <option value={6}>6+</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
            <option value={9}>9+</option>
          </select>
        </label>
      </div>

      {/* Map */}
      <div ref={mapRef} style={{ width: "100%", height: "520px", borderRadius: "8px", border: "1px solid #EBEBEB", marginBottom: "16px" }} />

      {/* Address lookup */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "8px", padding: "20px" }}>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>Find Your Schools</h3>
        <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#888" }}>
          Enter an Oakland address to see its assigned elementary, middle, and high school.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookupAddress()}
            placeholder="e.g. 3670 Penniman Ave, Oakland CA"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "14px", outline: "none" }} />
          <button onClick={lookupAddress} disabled={loading}
            style={{ padding: "10px 20px", background: "#B22222", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {loading ? "Looking up..." : "Look Up"}
          </button>
        </div>

        {report && (
          <div style={{ marginTop: "16px" }}>
            {report.error ? (
              <p style={{ color: "#B22222", fontSize: "13px" }}>{report.error}</p>
            ) : report.outside ? (
              <div>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 8px 0" }}>Results for: <strong>{report.address}</strong></p>
                <p style={{ fontSize: "13px", color: "#555" }}>This address falls outside OUSD attendance areas (Oakland only for now). Other East Bay districts are coming soon.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>Results for: <strong>{report.address}</strong></p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {LEVELS.map(level => {
                    const name = report[level.key];
                    return (
                      <div key={level.key} style={{ background: "#FAFAFA", border: `2px solid ${level.color}`, borderRadius: "6px", padding: "12px" }}>
                        <div style={{ fontSize: "10px", color: level.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{level.label}</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: name ? "6px" : 0 }}>{name ? titleCase(name) : "—"}</div>
                        {name && (
                          <a href={greatSchoolsUrl(name)} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: "11px", color: level.color, textDecoration: "none", fontWeight: 600 }}>GreatSchools →</a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
