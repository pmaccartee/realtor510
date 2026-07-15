// Standalone mount for the East Bay Schools Map so it can be embedded in the
// hand-authored static page at /east-bay-school-guide. Reuses the exact same
// <SchoolMap /> component rendered on /schools (no duplicate map code). Built by
// script/build.ts into dist/public/embed/school-map-embed.js (fixed filename so
// the static HTML can reference it directly).
import { createRoot } from "react-dom/client";
import SchoolMap from "@/components/SchoolMap";

const el = document.getElementById("school-map-embed-root");
if (el) createRoot(el).render(<SchoolMap />);
