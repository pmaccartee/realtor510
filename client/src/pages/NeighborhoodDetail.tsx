import { useParams, useLocation } from "wouter";
import { useEffect, useState, useRef, useCallback } from "react";

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
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const title = neighborhoodTitles[slug] || "Neighborhood Guide";
    document.title = `${title} | Patrick MacCartee`;

    setLoading(true);
    fetch(`/neighborhood-html/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => {
        setHtml(text);
        setLoading(false);
      })
      .catch(() => {
        setHtml("<h1>Page not found</h1>");
        setLoading(false);
      });
  }, [slug]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      e.preventDefault();
      navigate(href);
    },
    [navigate]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [handleClick, html]);

  useEffect(() => {
    if (!html || loading) return;
    const container = containerRef.current;
    if (!container) return;

    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html, loading]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          color: "hsl(0, 0%, 40%)",
          fontSize: "14px",
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ isolation: "isolate" }}
    />
  );
}
