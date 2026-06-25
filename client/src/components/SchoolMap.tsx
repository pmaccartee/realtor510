// School Map Component for realtor510.com
// Drop into your React/Next.js site as a page or section component

import { useState, useEffect, useRef } from "react";

// Read from .env (VITE_GOOGLE_MAPS_KEY) — never hardcode the key here; this file is committed to git.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string;

declare global {
  interface Window {
    google?: any;
  }
}

const schools = {
  elementary: [
    { name: "Piedmont Elementary", district: "Piedmont Unified", rating: 10, lat: 37.8244, lng: -122.2330, description: "Top-ranked elementary in Piedmont Unified, one of California's highest-performing districts." },
    { name: "Beach Elementary", district: "Piedmont Unified", rating: 10, lat: 37.8228, lng: -122.2310, description: "Piedmont Unified elementary serving the heart of Piedmont." },
    { name: "Marin Elementary", district: "Albany Unified", rating: 9, lat: 37.8897, lng: -122.2977, description: "Albany Unified's top-rated elementary. Albany USD consistently outperforms comparable Bay Area districts." },
    { name: "Cornell Elementary", district: "Albany Unified", rating: 9, lat: 37.8872, lng: -122.2999, description: "Strong academics and tight community feel — hallmarks of Albany Unified." },
    { name: "Claremont Middle Feeder — Emerson", district: "Berkeley Unified", rating: 8, lat: 37.8596, lng: -122.2523, description: "Serves Berkeley's Elmwood and Claremont neighborhoods. Strong parent community." },
    { name: "Thornhill Elementary", district: "Oakland Unified", rating: 8, lat: 37.8178, lng: -122.2105, description: "Oakland Hills elementary serving Montclair. One of OUSD's highest-rated schools." },
    { name: "Montclair Elementary", district: "Oakland Unified", rating: 7, lat: 37.8215, lng: -122.2150, description: "Montclair neighborhood elementary with strong parental involvement." },
    { name: "Crocker Highlands Elementary", district: "Oakland Unified", rating: 8, lat: 37.8118, lng: -122.2218, description: "Serves Crocker Highlands and Grand Lake. Consistently one of OUSD's top performers." },
    { name: "Rockridge/Peralta Elementary", district: "Oakland Unified", rating: 7, lat: 37.8376, lng: -122.2524, description: "Serves the Rockridge neighborhood. Strong academics within OUSD." },
    { name: "Edison Elementary", district: "Alameda Unified", rating: 8, lat: 37.7746, lng: -122.2580, description: "Alameda Unified elementary with strong community ties on the island." },
    { name: "Del Rey Elementary", district: "Alameda Unified", rating: 8, lat: 37.7698, lng: -122.2479, description: "Well-regarded Alameda Unified elementary in a quiet residential neighborhood." },
    { name: "Sleepy Hollow Elementary", district: "Orinda Union", rating: 10, lat: 37.8793, lng: -122.1773, description: "Top-rated elementary in Orinda. Feeds into Acalanes Union High School District." },
    { name: "Burton Valley Elementary", district: "Lafayette", rating: 10, lat: 37.8868, lng: -122.1185, description: "Lafayette elementary feeding into the highly regarded Acalanes district." },
  ],
  middle: [
    { name: "Piedmont Middle School", district: "Piedmont Unified", rating: 10, lat: 37.8236, lng: -122.2285, description: "Exceptional middle school in Piedmont Unified. Direct feeder to Piedmont High." },
    { name: "Albany Middle School", district: "Albany Unified", rating: 9, lat: 37.8869, lng: -122.2988, description: "Albany Unified's sole middle school — tight-knit, high-performing, and well-resourced." },
    { name: "Claremont Middle School", district: "Berkeley Unified", rating: 8, lat: 37.8574, lng: -122.2496, description: "Serves Berkeley Hills and Elmwood. Strong academics and arts programs." },
    { name: "Montera Middle School", district: "Oakland Unified", rating: 7, lat: 37.8198, lng: -122.2089, description: "Serves Montclair and the Oakland Hills. One of OUSD's strongest middle schools." },
    { name: "Edna Brewer Middle School", district: "Oakland Unified", rating: 7, lat: 37.8298, lng: -122.2398, description: "Serves Rockridge and Temescal. Well-regarded within OUSD." },
    { name: "Lincoln Middle School", district: "Alameda Unified", rating: 8, lat: 37.7731, lng: -122.2521, description: "Alameda Unified middle school with strong academic programs." },
    { name: "Orinda Intermediate", district: "Acalanes Union", rating: 10, lat: 37.8776, lng: -122.1796, description: "Feeds directly into Miramonte High. Part of the top-ranked Acalanes district." },
    { name: "Stanley Middle School", district: "Lafayette", rating: 10, lat: 37.8833, lng: -122.1229, description: "Highly regarded Lafayette middle school feeding into Acalanes Union High." },
  ],
  high: [
    { name: "Piedmont High School", district: "Piedmont Unified", rating: 10, lat: 37.8222, lng: -122.2267, description: "Top 1–2% of California public high schools. Exceptional academics, athletics, and college placement. The single strongest argument for buying in Piedmont." },
    { name: "Albany High School", district: "Albany Unified", rating: 9, lat: 37.8863, lng: -122.2979, description: "Consistently high-performing. Albany USD's crown jewel — strong academics at a value price point compared to comparable districts." },
    { name: "Berkeley High School", district: "Berkeley Unified", rating: 8, lat: 37.8694, lng: -122.2686, description: "One of California's most distinctive public high schools. Broadest course catalog in the region, strong arts and AP programs, genuine diversity." },
    { name: "Skyline High School", district: "Oakland Unified", rating: 7, lat: 37.8089, lng: -122.1923, description: "Serves the Oakland Hills. OUSD's highest-rated comprehensive high school." },
    { name: "Alameda High School", district: "Alameda Unified", rating: 8, lat: 37.7697, lng: -122.2428, description: "Well-regarded Alameda Unified high school with strong athletics and academics." },
    { name: "Encinal High School", district: "Alameda Unified", rating: 7, lat: 37.7741, lng: -122.2609, description: "Alameda's second high school — smaller, tight-knit community feel." },
    { name: "Miramonte High School", district: "Acalanes Union", rating: 10, lat: 37.8788, lng: -122.1742, description: "Orinda's premier high school. Acalanes Union is one of California's top public high school districts." },
    { name: "Campolindo High School", district: "Acalanes Union", rating: 10, lat: 37.8927, lng: -122.1156, description: "Moraga's high school in the Acalanes district. Exceptional academics and a strong community." },
    { name: "Acalanes High School", district: "Acalanes Union", rating: 10, lat: 37.8947, lng: -122.1218, description: "Lafayette's high school. Consistently one of California's top public schools for college preparation." },
    { name: "Las Lomas High School", district: "Acalanes Union", rating: 9, lat: 37.9109, lng: -122.0618, description: "Walnut Creek's Acalanes district high school. Strong academics and extensive extracurricular programs." },
  ]
};

const levelColors = {
  elementary: "#B22222",
  middle: "#2255B2",
  high: "#228B22"
};

const levelLabels = {
  elementary: "Elementary Schools",
  middle: "Middle Schools",
  high: "High Schools"
};

export default function SchoolMap() {
  const [activeLevel, setActiveLevel] = useState<"elementary" | "middle" | "high">("high");
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const geocoderRef = useRef<any>(null);

  useEffect(() => {
    if (window.google) {
      initMap();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers();
    }
  }, [activeLevel]);

  function initMap() {
    if (!mapRef.current) return;
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.845, lng: -122.22 },
      zoom: 12,
      styles: [
        { featureType: "poi.school", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    geocoderRef.current = new window.google.maps.Geocoder();
    updateMarkers();
  }

  function updateMarkers() {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    const currentSchools = schools[activeLevel];
    const color = levelColors[activeLevel];

    currentSchools.forEach(school => {
      const marker = new window.google.maps.Marker({
        position: { lat: school.lat, lng: school.lng },
        map: mapInstanceRef.current,
        title: school.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: color,
          fillOpacity: 0.9,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
        label: {
          text: school.rating.toString(),
          color: "#fff",
          fontSize: "10px",
          fontWeight: "bold",
        }
      });

      marker.addListener("click", () => {
        setSelectedSchool(school);
      });

      markersRef.current.push(marker);
    });
  }

  function getRatingColor(rating: number) {
    if (rating >= 9) return "#228B22";
    if (rating >= 7) return "#B8860B";
    return "#B22222";
  }

  async function lookupAddress() {
    if (!address.trim() || !geocoderRef.current) return;
    setLoading(true);
    setReport(null);

    geocoderRef.current.geocode({ address: `${address}, East Bay, CA` }, (results: any, status: any) => {
      setLoading(false);
      if (status !== "OK" || !results[0]) {
        setReport({ error: "Address not found. Try a neighborhood name like 'Montclair, Oakland' or 'Piedmont, CA'." });
        return;
      }

      const loc = results[0].geometry.location;
      const lat = loc.lat();
      const lng = loc.lng();

      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(14);

      // Find nearest school at each level
      const findNearest = (level: "elementary" | "middle" | "high") => {
        let nearest = null;
        let minDist = Infinity;
        schools[level].forEach(school => {
          const dist = Math.sqrt(Math.pow(school.lat - lat, 2) + Math.pow(school.lng - lng, 2));
          if (dist < minDist) { minDist = dist; nearest = school; }
        });
        return nearest;
      };

      setReport({
        address: results[0].formatted_address,
        elementary: findNearest("elementary"),
        middle: findNearest("middle"),
        high: findNearest("high"),
      });
    });
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#1A1A1A", marginBottom: "8px" }}>
        East Bay School Explorer
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px", lineHeight: 1.6 }}>
        Browse schools by level across Piedmont, Berkeley, Albany, Oakland Hills, Alameda, and LaMorinda.
        Numbers on markers show GreatSchools ratings (1–10). Click any marker for details.
      </p>

      {/* Level Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(["elementary", "middle", "high"] as const).map(level => (
          <button
            key={level}
            onClick={() => { setActiveLevel(level); setSelectedSchool(null); }}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: activeLevel === level ? levelColors[level] : "#F0F0F0",
              color: activeLevel === level ? "#fff" : "#555",
              transition: "all 0.2s",
            }}
          >
            {levelLabels[level]}
          </button>
        ))}
      </div>

      {/* Map */}
      <div ref={mapRef} style={{ width: "100%", height: "480px", borderRadius: "8px", border: "1px solid #EBEBEB", marginBottom: "16px" }} />

      {/* Selected School Info */}
      {selectedSchool && (
        <div style={{ background: "#FAFAFA", border: `2px solid ${levelColors[activeLevel]}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>{selectedSchool.name}</h3>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>{selectedSchool.district}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{selectedSchool.description}</p>
            </div>
            <div style={{ textAlign: "center", minWidth: "60px", marginLeft: "16px" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, color: getRatingColor(selectedSchool.rating), lineHeight: 1 }}>{selectedSchool.rating}</div>
              <div style={{ fontSize: "10px", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>GreatSchools</div>
            </div>
          </div>
        </div>
      )}

      {/* Address Lookup */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "8px", padding: "20px", marginTop: "8px" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>
          Find Schools for a Specific Address
        </h3>
        <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#888" }}>Enter an address or neighborhood to see your assigned schools at all three levels.</p>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookupAddress()}
            placeholder="e.g. 123 Main St, Piedmont CA or Montclair, Oakland"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "14px", outline: "none" }}
          />
          <button
            onClick={lookupAddress}
            disabled={loading}
            style={{ padding: "10px 20px", background: "#B22222", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {loading ? "Looking up..." : "Look Up"}
          </button>
        </div>

        {/* Report */}
        {report && (
          <div style={{ marginTop: "16px" }}>
            {report.error ? (
              <p style={{ color: "#B22222", fontSize: "13px" }}>{report.error}</p>
            ) : (
              <>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>Results for: <strong>{report.address}</strong></p>
                <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 12px 0" }}>
                  ⚠️ School assignments shown are approximate based on proximity. Always verify directly with the district before purchasing.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {(["elementary", "middle", "high"] as const).map(level => {
                    const school = report[level];
                    if (!school) return null;
                    return (
                      <div key={level} style={{ background: "#FAFAFA", border: `1px solid ${levelColors[level]}`, borderRadius: "6px", padding: "12px" }}>
                        <div style={{ fontSize: "10px", color: levelColors[level], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{levelLabels[level]}</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "4px" }}>{school.name}</div>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{school.district}</div>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: getRatingColor(school.rating) }}>{school.rating}<span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>/10</span></div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
