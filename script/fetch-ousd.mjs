// One-time data fetch: official OUSD 2025-26 attendance boundaries + school points.
// Source: OUSD ArcGIS FeatureServer (public, no auth).
//   layer 5 = elementary boundaries, 4 = middle, 3 = high, 10 = school points.
//
// Saves normalized GeoJSON FeatureCollections to client/src/data/. Boundary
// layers are fetched with maxAllowableOffset (server-side generalization,
// ~11 m — invisible at map zoom) to keep the bundle small.
//
// Run: node script/fetch-ousd.mjs

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(__dirname, "..", "client", "src", "data");
const BASE =
  "https://services.arcgis.com/U40mlB625LyOsvdX/arcgis/rest/services/OUSD_Public_Schools_2025_2026_WFL1/FeatureServer";

const BOUNDARY_LAYERS = [
  { layer: 5, level: "elementary", nameField: "Elementary_School_Attendance_Ar", out: "ousd-elementary-boundaries.geojson" },
  { layer: 4, level: "middle", nameField: "Middle_School_Attendance_Area", out: "ousd-middle-boundaries.geojson" },
  { layer: 3, level: "high", nameField: "High_School_Attendance_Area", out: "ousd-high-boundaries.geojson" },
];

// Round every coordinate in a (possibly nested) coordinate array to ~1 m.
function roundCoords(c) {
  return typeof c[0] === "number"
    ? [Math.round(c[0] * 1e5) / 1e5, Math.round(c[1] * 1e5) / 1e5]
    : c.map(roundCoords);
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
}

async function fetchBoundaries({ layer, level, nameField, out }) {
  const params = new URLSearchParams({
    where: "1=1",
    outFields: nameField,
    f: "geojson",
    outSR: "4326",
    resultRecordCount: "2000",
    maxAllowableOffset: "0.0001",
  });
  const geo = await getJson(`${BASE}/${layer}/query?${params}`);
  const features = (geo.features || [])
    .filter(f => f.geometry)
    .map(f => ({
      type: "Feature",
      properties: { school: f.properties[nameField], level },
      geometry: { type: f.geometry.type, coordinates: roundCoords(f.geometry.coordinates) },
    }));
  const fc = { type: "FeatureCollection", features };
  await writeFile(path.join(DATA, out), JSON.stringify(fc));
  console.log(`  ${out.padEnd(34)} ${features.length} zones, ${(JSON.stringify(fc).length / 1024).toFixed(0)} kB`);
}

async function fetchPoints() {
  const params = new URLSearchParams({
    where: "1=1",
    outFields: "School_Name,School_Type,Grade_Span,Address",
    f: "geojson",
    outSR: "4326",
    resultRecordCount: "2000",
  });
  const geo = await getJson(`${BASE}/10/query?${params}`);
  const features = (geo.features || [])
    .filter(f => f.geometry)
    .map(f => ({
      type: "Feature",
      properties: {
        name: f.properties.School_Name,
        type: f.properties.School_Type,
        gradeSpan: f.properties.Grade_Span,
        address: f.properties.Address,
      },
      geometry: { type: "Point", coordinates: roundCoords(f.geometry.coordinates) },
    }));
  const fc = { type: "FeatureCollection", features };
  await writeFile(path.join(DATA, "ousd-school-points.geojson"), JSON.stringify(fc));
  console.log(`  ousd-school-points.geojson         ${features.length} points, ${(JSON.stringify(fc).length / 1024).toFixed(0)} kB`);
}

async function main() {
  await mkdir(DATA, { recursive: true });
  console.log("Fetching OUSD 2025-26 attendance data…");
  for (const b of BOUNDARY_LAYERS) await fetchBoundaries(b);
  await fetchPoints();
  console.log("Done.");
}

main().catch(e => { console.error(e); process.exit(1); });
