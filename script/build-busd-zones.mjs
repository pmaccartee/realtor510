// One-time build: Berkeley Unified (BUSD) 3-zone elementary attendance areas.
//
// Berkeley assigns elementary school by ZONE (lottery within each of 3 zones),
// not by per-school street catchment, so it is absent from NCES SABS. There is
// no published GIS polygon for the zones. This script reconstructs them from:
//   1. BUSD's official street-range directory (the authoritative source the
//      district's "Find Your BUSD Zone" tool uses), scraped from
//      berkeleyschools.net/admissions/find-your-busd-zone/<letter>-addresses/
//   2. ~44k Berkeley address points from OpenStreetMap (Overpass), each tagged
//      with its zone by matching street + house-number to a directory rule.
//   3. The tagged points are classified onto a ~55 m grid (nearest tagged point),
//      denoised, and each zone's cell set is traced into boundary polygons.
//
// Result is APPROXIMATE near zone edges — confirm exact assignment with BUSD.
//
// Run: node script/build-busd-zones.mjs

import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "client", "src", "data", "busdZones.ts");
const UA = "realtor510-busd-zones/1.0 (patrick@realtor510.com)";
const BBOX = [37.840, -122.330, 37.910, -122.225]; // Berkeley
const ZONES = ["Northwest", "Central", "Southeast"];
const SCHOOLS = {
  Northwest: ["Berkeley Arts Magnet", "Rosa Parks", "Ruth Acty", "Thousand Oaks"],
  Central: ["Berkeley Arts Magnet", "Cragmont", "Malcolm X", "Oxford", "Washington"],
  Southeast: ["Emerson", "John Muir", "Malcolm X"],
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- 1. scrape the street-range directory ----------
function parseRange(s) {
  s = s.replace(/&nbsp;|&#160;/g, " ").trim();
  const low = s.toLowerCase();
  const parity = low.includes("odd") ? "odd" : low.includes("even") ? "even" : "all";
  if (low.includes("no house number") || !low) return [0, 1e7, "all"];
  const nums = (s.match(/\d+/g) || []).map(Number);
  if (!nums.length) return [0, 1e7, parity];
  if (nums.length === 1) return [nums[0], nums[0], parity];
  return [Math.min(nums[0], nums[nums.length - 1]), Math.max(nums[0], nums[nums.length - 1]), parity];
}

async function scrapeDirectory() {
  const rules = [];
  for (const L of "abcdefghijklmnopqrstuvwxyz") {
    const url = `https://www.berkeleyschools.net/admissions/find-your-busd-zone/${L}-addresses/`;
    let html = "";
    try { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (r.ok) html = await r.text(); }
    catch { /* skip */ }
    for (const tr of html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || []) {
      const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
        .map(m => m[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim());
      if (cells.length < 3) continue;
      const [street, addr, zone] = cells;
      if (!ZONES.includes(zone)) continue;
      const [lo, hi, parity] = parseRange(addr);
      rules.push({ street, lo, hi, parity, zone });
    }
    await sleep(400);
  }
  return rules;
}

// ---------- 2. fetch OSM address points ----------
async function fetchAddresses() {
  const q = `[out:json][timeout:120];(nwr["addr:housenumber"]["addr:street"](${BBOX.join(",")}););out center tags;`;
  const r = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST", headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" },
    body: "data=" + encodeURIComponent(q),
  });
  if (!r.ok) throw new Error("Overpass HTTP " + r.status);
  return (await r.json()).elements;
}

// ---------- 3. join ----------
const TYPES = { st: "street", str: "street", ave: "avenue", av: "avenue", blvd: "boulevard", dr: "drive", ln: "lane", ct: "court", pl: "place", rd: "road", ter: "terrace", terr: "terrace", cir: "circle", pkwy: "parkway", hwy: "highway", sq: "square", plz: "plaza", cres: "crescent" };
function norm(s) {
  s = (s || "").toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
  const p = s.split(" "); if (TYPES[p[p.length - 1]]) p[p.length - 1] = TYPES[p[p.length - 1]];
  return p.join(" ");
}
function zoneFor(rs, num) {
  for (const r of rs) if (num >= r.lo && num <= r.hi && (r.parity === "all" || (r.parity === "odd") === (num % 2 === 1))) return r.zone;
  const zs = [...new Set(rs.map(r => r.zone))]; if (zs.length === 1) return zs[0];
  let best = null, bd = Infinity; for (const r of rs) { const d = num < r.lo ? r.lo - num : num > r.hi ? num - r.hi : 0; if (d < bd) { bd = d; best = r; } }
  return best ? best.zone : null;
}

function buildZones(rules, osm) {
  const ZIDX = { Northwest: 0, Central: 1, Southeast: 2 };
  const byStreet = new Map();
  for (const r of rules) { const k = norm(r.street); (byStreet.get(k) || byStreet.set(k, []).get(k)).push(r); }
  const tagged = [];
  for (const e of osm) {
    const t = e.tags || {}; const lat = e.lat ?? e.center?.lat, lng = e.lon ?? e.center?.lon; if (lat == null) continue;
    const rs = byStreet.get(norm(t["addr:street"])); if (!rs) continue;
    const num = parseInt((String(t["addr:housenumber"]).match(/\d+/) || [])[0]); if (isNaN(num)) continue;
    const zone = zoneFor(rs, num); if (zone) tagged.push({ lat, lng, z: ZIDX[zone] });
  }

  // grid + nearest-neighbour classification
  const CELL = 0.0006;
  let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
  for (const p of tagged) { minLat = Math.min(minLat, p.lat); minLng = Math.min(minLng, p.lng); maxLat = Math.max(maxLat, p.lat); maxLng = Math.max(maxLng, p.lng); }
  minLat -= CELL * 2; minLng -= CELL * 2; maxLat += CELL * 2; maxLng += CELL * 2;
  const cols = Math.ceil((maxLng - minLng) / CELL) + 1, rows = Math.ceil((maxLat - minLat) / CELL) + 1;
  const cc = lng => Math.floor((lng - minLng) / CELL), rr = lat => Math.floor((lat - minLat) / CELL);
  const buckets = new Map();
  for (const p of tagged) { const k = cc(p.lng) + "," + rr(p.lat); (buckets.get(k) || buckets.set(k, []).get(k)).push(p); }
  const MAXR = 3;
  const label = new Int8Array(cols * rows).fill(-1);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const cy = minLat + (r + 0.5) * CELL, cx = minLng + (c + 0.5) * CELL;
    let best = -1, bd = Infinity;
    for (let rad = 0; rad <= MAXR && best < 0; rad++) for (let dc = -rad; dc <= rad; dc++) for (let dr = -rad; dr <= rad; dr++) {
      if (Math.max(Math.abs(dc), Math.abs(dr)) !== rad) continue;
      const arr = buckets.get((c + dc) + "," + (r + dr)); if (!arr) continue;
      for (const p of arr) { const d = (p.lat - cy) ** 2 + (p.lng - cx) ** 2; if (d < bd) { bd = d; best = p.z; } }
    }
    label[r * cols + c] = best;
  }
  // denoise (majority of 8), 2 passes
  for (let pass = 0; pass < 2; pass++) {
    const next = label.slice();
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cur = label[r * cols + c]; if (cur < 0) continue;
      const cnt = [0, 0, 0]; let tot = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { if (!dr && !dc) continue; const nr = r + dr, nc = c + dc; if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue; const l = label[nr * cols + nc]; if (l >= 0) { cnt[l]++; tot++; } }
      let mx = cur; for (let z = 0; z < 3; z++) if (cnt[z] > cnt[mx]) mx = z;
      if (tot >= 5 && cnt[mx] >= 5 && mx !== cur) next[r * cols + c] = mx;
    }
    label.set(next);
  }
  // drop small disconnected islands per zone
  const comp = new Int32Array(cols * rows).fill(-1); const sizes = [], compZone = []; let nc = 0; const stack = [];
  for (let i0 = 0; i0 < label.length; i0++) {
    const z = label[i0]; if (z < 0 || comp[i0] >= 0) continue; comp[i0] = nc; let size = 0; stack.length = 0; stack.push(i0);
    while (stack.length) { const i = stack.pop(); size++; const cr = Math.floor(i / cols), c2 = i % cols; for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nr = cr + dr, nci = c2 + dc; if (nr < 0 || nci < 0 || nr >= rows || nci >= cols) continue; const ni = nr * cols + nci; if (label[ni] === z && comp[ni] < 0) { comp[ni] = nc; stack.push(ni); } } }
    sizes.push(size); compZone.push(z); nc++;
  }
  const maxByZone = [0, 0, 0]; for (let k = 0; k < nc; k++) if (sizes[k] > maxByZone[compZone[k]]) maxByZone[compZone[k]] = sizes[k];
  for (let i = 0; i < label.length; i++) { const k = comp[i]; if (k >= 0 && sizes[k] < maxByZone[compZone[k]] * 0.10) label[i] = -1; }

  // trace boundaries (directed edges, filled cell on left)
  function ringsFor(z) {
    const isZ = (c, r) => c >= 0 && r >= 0 && c < cols && r < rows && label[r * cols + c] === z;
    const out = new Map();
    const add = (x1, y1, x2, y2, dir) => { const k = x1 + "," + y1; (out.get(k) || out.set(k, []).get(k)).push({ x: x2, y: y2, dir }); };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (label[r * cols + c] !== z) continue;
      if (!isZ(c, r - 1)) add(c, r, c + 1, r, 0);
      if (!isZ(c + 1, r)) add(c + 1, r, c + 1, r + 1, 1);
      if (!isZ(c, r + 1)) add(c + 1, r + 1, c, r + 1, 2);
      if (!isZ(c - 1, r)) add(c, r + 1, c, r, 3);
    }
    const rings = [];
    for (const [k, arr] of out) for (const seed of arr) {
      if (seed.used) continue;
      const [sx, sy] = k.split(",").map(Number); const ring = [[sx, sy]];
      let e = seed; e.used = true; let dir = e.dir, nx = e.x, ny = e.y, g = 0;
      while (!(nx === sx && ny === sy) && g++ < 1e6) {
        ring.push([nx, ny]);
        const opts = (out.get(nx + "," + ny) || []).filter(o => !o.used); if (!opts.length) break;
        const pref = [(dir + 3) % 4, dir, (dir + 1) % 4, (dir + 2) % 4]; let ch = null;
        for (const pd of pref) { const o = opts.find(x => x.dir === pd); if (o) { ch = o; break; } }
        if (!ch) ch = opts[0]; ch.used = true; dir = ch.dir; nx = ch.x; ny = ch.y;
      }
      if (ring.length >= 4) rings.push(ring);
    }
    const toXY = ([x, y]) => [minLng + x * CELL, minLat + y * CELL];
    const simp = (pts, tol) => {
      if (pts.length < 4) return pts;
      const d2 = (p, a, b) => { const [x, y] = p, [x1, y1] = a, [x2, y2] = b; const dx = x2 - x1, dy = y2 - y1; const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy || 1); const px = x1 + t * dx, py = y1 + t * dy; return (x - px) ** 2 + (y - py) ** 2; };
      const keep = Array(pts.length).fill(false); keep[0] = keep[pts.length - 1] = true; const st = [[0, pts.length - 1]];
      while (st.length) { const [a, b] = st.pop(); let mi = -1, md = 0; for (let i = a + 1; i < b; i++) { const d = d2(pts[i], pts[a], pts[b]); if (d > md) { md = d; mi = i; } } if (md > tol * tol) { keep[mi] = true; st.push([a, mi], [mi, b]); } }
      return pts.filter((_, i) => keep[i]);
    };
    const area = r => { let a = 0; for (let i = 0; i < r.length - 1; i++) a += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]; return Math.abs(a / 2) * 111000 * 88000; };
    return rings.map(r => simp(r.map(toXY), CELL * 0.8)).filter(r => r.length >= 4).map(r => {
      const pr = r.map(([lng, lat]) => [Math.round(lng * 1e5) / 1e5, Math.round(lat * 1e5) / 1e5]);
      const f = pr[0], l = pr[pr.length - 1]; if (f[0] !== l[0] || f[1] !== l[1]) pr.push([f[0], f[1]]);
      return pr;
    }).filter(area_ => area(area_) > 200000);
  }

  return ZONES.map((zone, i) => ({ zone, schools: SCHOOLS[zone], rings: ringsFor(i) }));
}

async function main() {
  console.log("Scraping BUSD street-range directory…");
  const rules = await scrapeDirectory();
  console.log(`  ${rules.length} zone rules across ${new Set(rules.map(r => r.street)).size} streets`);
  console.log("Fetching Berkeley address points (OpenStreetMap)…");
  const osm = await fetchAddresses();
  console.log(`  ${osm.length} addressed features`);
  console.log("Joining + building zone polygons…");
  const zones = buildZones(rules, osm);
  const header =
    "// AUTO-GENERATED by script/build-busd-zones.mjs — do not edit by hand.\n" +
    "// Berkeley Unified 3-zone elementary system (lottery within each zone). Berkeley\n" +
    "// assigns by zone, not per-school catchment, so it is not in NCES SABS. These\n" +
    "// zone polygons are reconstructed from BUSD's official address directory\n" +
    "// (berkeleyschools.net/admissions/find-your-busd-zone) joined to Berkeley\n" +
    "// OpenStreetMap address points, classified on a ~55m grid. Approximate near\n" +
    "// edges — confirm exact assignment with BUSD's address lookup.\n" +
    "export type BusdZone = { zone: string; schools: string[]; rings: number[][][] };\n\n" +
    "export const busdZones: BusdZone[] = ";
  await writeFile(OUT, header + JSON.stringify(zones) + ";\n");
  zones.forEach(z => console.log(`  ${z.zone}: ${z.rings.length} ring(s)`));
  console.log("Wrote", path.relative(process.cwd(), OUT));
}

main().catch(e => { console.error(e); process.exit(1); });
