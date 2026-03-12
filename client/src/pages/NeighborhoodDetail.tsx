import { useParams } from "wouter";
import { useEffect, useState } from "react";

const neighborhoodTitles: Record<string, string> = {
  "crocker-highlands": "Crocker Highlands",
  "piedmont": "Piedmont",
  "temescal": "Temescal",
  "sequoyah-hills": "Sequoyah Hills",
  "rockridge": "Rockridge",
  "oakmore-glenview": "Oakmore-Glenview",
  "montclair": "Montclair",
  "berkeley-hills": "Berkeley Hills",
  "trestle-glen": "Trestle Glen",
  "alameda": "Alameda",
  "berkeley": "Berkeley",
  "oakland": "Oakland",
  "piedmont-guide": "Piedmont",
  "piedmont-vs-rockridge": "Piedmont vs Rockridge",
  "crocker-highlands-trestle-glen": "Crocker Highlands & Trestle Glen",
  "selling-crocker-highlands": "Selling in Crocker Highlands",
  "piedmont-luxury-market": "Piedmont Luxury Market",
};

export default function NeighborhoodDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const title = neighborhoodTitles[slug] || "Neighborhood Guide";
    document.title = `${title} | Patrick MacCartee`;
    setLoading(true);
  }, [slug]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {loading && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff", zIndex: 10,
          fontFamily: "'Montserrat', sans-serif", color: "hsl(0, 0%, 40%)",
          fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase"
        }}>
          Loading...
        </div>
      )}
      <iframe
        src={`/neighborhood-html/${slug}`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title={neighborhoodTitles[slug] || "Neighborhood Guide"}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
