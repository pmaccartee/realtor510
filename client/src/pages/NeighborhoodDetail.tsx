import { useParams, useLocation } from "wouter";
import { useEffect, useState, useRef, useCallback } from "react";

const neighborhoodTitles: Record<string, string> = {
  "crocker-highlands-guide": "Crocker Highlands",
  "piedmont-home-values": "Piedmont Home Values",
  "temescal-guide": "Temescal",
  "sequoyah-hills-market-report": "Sequoyah Hills",
  "rockridge-guide": "Rockridge",
  "oakmore-glenview-guide": "Oakmore-Glenview",
  "montclair-guide": "Montclair",
  "berkeley-hills-guide": "Berkeley Hills",
  "trestle-glen-guide": "Trestle Glen",
  "alameda-neighborhood-guide": "Alameda",
  "berkeley-neighborhood-guide": "Berkeley",
  "oakland-neighborhood-guide": "Oakland",
  "piedmont-neighborhood-guide": "Piedmont",
  "piedmont-vs-rockridge": "Piedmont vs Rockridge",
  "crocker-highlands-trestle-glen-oakland": "Crocker Highlands & Trestle Glen",
  "selling-crocker-highlands-oakland": "Selling in Crocker Highlands",
  "piedmont-luxury-market": "Piedmont Luxury Market",
};

function extractParts(html: string): { styles: string; body: string; links: string[]; scripts: string[] } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const styleEls = doc.querySelectorAll("style");
  const styles = Array.from(styleEls).map((s) => s.textContent || "").join("\n");

  const linkEls = doc.querySelectorAll('link[rel="stylesheet"], link[href*="fonts.googleapis.com"]');
  const links = Array.from(linkEls).map((l) => l.getAttribute("href") || "").filter(Boolean);

  const scriptEls = doc.querySelectorAll("script:not([type='application/ld+json'])");
  const scripts: string[] = [];
  scriptEls.forEach((s) => {
    if (s.textContent && !s.getAttribute("src")) {
      scripts.push(s.textContent);
    }
  });

  const body = doc.body ? doc.body.innerHTML : "";

  return { styles, body, links, scripts };
}

export default function NeighborhoodDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [bodyHtml, setBodyHtml] = useState("");
  const [cssText, setCssText] = useState("");
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
      .then((rawHtml) => {
        const { styles, body, links, scripts } = extractParts(rawHtml);
        setCssText(styles);
        setBodyHtml(body);

        links.forEach((href) => {
          if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
          }
        });

        setLoading(false);

        setTimeout(() => {
          scripts.forEach((code) => {
            try {
              const fn = new Function(code);
              fn();
            } catch (e) {
              // ignore script errors
            }
          });
        }, 100);
      })
      .catch(() => {
        setBodyHtml("<h1>Page not found</h1>");
        setLoading(false);
      });
  }, [slug]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
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
  }, [handleClick, bodyHtml]);

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
    <>
      {cssText && <style dangerouslySetInnerHTML={{ __html: cssText }} />}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </>
  );
}
