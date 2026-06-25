// OUSD (Oakland Unified) attendance map.
// Boundary + point data: official OUSD 2025-26 ArcGIS FeatureServer, fetched and
// bundled by script/fetch-ousd.mjs into the .geojson files imported below.
// Scope: OUSD only. Piedmont / Berkeley / Alameda USD are phase 2.

import { useState, useEffect, useRef } from "react";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

import elemRaw from "@/data/ousd-elementary-boundaries.geojson?raw";
import midRaw from "@/data/ousd-middle-boundaries.geojson?raw";
import highRaw from "@/data/ousd-high-boundaries.geojson?raw";
import pointsRaw from "@/data/ousd-school-points.geojson?raw";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

type LatLng = { lat: number; lng: number };
type Level = "elementary" | "middle" | "high";

const elementaryFC = JSON.parse(elemRaw);
const middleFC = JSON.parse(midRaw);
const highFC = JSON.parse(highRaw);
const pointsFC = JSON.parse(pointsRaw);

const LEVELS: { key: Level; label: string; color: string; fc: any }[] = [
  { key: "elementary", label: "Elementary", color: "#2E7D32", fc: elementaryFC }, // green
  { key: "middle", label: "Middle", color: "#1565C0", fc: middleFC }, // blue
  { key: "high", label: "High", color: "#14216B", fc: highFC }, // navy
];

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

export default function SchoolMap() {
  const [visible, setVisible] = useState<Record<Level, boolean>>({
    elementary: true,
    middle: false,
    high: false,
  });
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  function initMap() {
    if (!mapRef.current) return;
    const g = (window as any).google;
    mapInstanceRef.current = new g.maps.Map(mapRef.current, {
      center: { lat: 37.79, lng: -122.20 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    geocoderRef.current = new g.maps.Geocoder();
    infoWindowRef.current = new g.maps.InfoWindow();
    drawPins();
    drawPolygons();
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
          strokeOpacity: 0.85,
          strokeWeight: 1.5,
          fillColor: level.color,
          fillOpacity: 0.25,
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
  }

  function drawPins() {
    const g = (window as any).google;
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    for (const feature of pointsFC.features) {
      const [lng, lat] = feature.geometry.coordinates;
      const p = feature.properties;
      const marker = new g.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        title: p.name,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 5,
          fillColor: "#B22222",
          fillOpacity: 0.95,
          strokeColor: "#fff",
          strokeWeight: 1.5,
        },
      });
      marker.addListener("click", () => {
        infoWindowRef.current.setContent(
          `<div style="font-family:Arial,sans-serif;max-width:220px">
             <div style="font-weight:700;font-size:14px;margin-bottom:2px">${p.name}</div>
             <div style="font-size:11px;color:#666;margin-bottom:4px">${p.type}${p.gradeSpan ? " · " + p.gradeSpan : ""}</div>
             ${p.address ? `<div style="font-size:11px;color:#888;margin-bottom:6px">${p.address}</div>` : ""}
             <a href="${greatSchoolsUrl(p.name)}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#B22222;font-weight:600">GreatSchools profile →</a>
           </div>`
        );
        infoWindowRef.current.setPosition({ lat, lng });
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
        Oakland School Attendance Map
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px", lineHeight: 1.6 }}>
        Official Oakland Unified (OUSD) attendance areas for 2025–26. Toggle elementary, middle, and high boundaries on or off, click any zone or school for details, or enter an address to find its assigned schools.
      </p>
      <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "20px" }}>
        ⚠️ Source: OUSD official attendance boundaries (2025–26). Assignments can change and some addresses have options/exceptions — always confirm directly with OUSD before relying on this.
      </p>

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
