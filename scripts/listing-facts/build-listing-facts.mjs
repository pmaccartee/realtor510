#!/usr/bin/env node
// Listing fact-page generator for realtor510.com
// Usage: node build-listing-facts.mjs [listings-dir] [public-dir]
//   defaults: ./listings  ->  ../../client/public
// Reads every listings/*.json and writes <public>/<slug>/facts/index.html.
// Flip a listing to sold by setting "status": "sold", "soldPrice", "soldDate".
// Prints llms.txt and sitemap lines to paste/merge at the end.

import fs from "node:fs";
import path from "node:path";

const SITE = "https://realtor510.com";
const AGENT = {
  name: "Patrick MacCartee",
  brokerage: "The Grubb Company",
  brokerageUrl: "https://www.grubbco.com/",
  dre: "02142693",
  phone: "510-859-4895", // web/public number (415 is for mailed pieces only)
  email: "patrick@realtor510.com",
  areas: ["Oakland", "Berkeley", "Piedmont", "Alameda", "Kensington", "El Cerrito", "Albany", "Orinda", "Lafayette", "Moraga", "San Leandro", "San Francisco"],
};

// Same favicon + analytics (GA4, Meta Pixel, Cloudflare Web Analytics) as the site's other property pages.
const HEAD_EXTRAS = `<link rel="icon" type="image/png" href="/favicon.png">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6DDVCG0Q3F"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6DDVCG0Q3F');</script>
<!-- Meta Pixel -->
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1438966301114887');fbq('track','PageView');</script>
<!-- Cloudflare Beacon -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7790379adaac4fcbbd5f81c0d86b8412"}'></script>`;

const listingsDir = path.resolve(process.argv[2] || "./listings");
const publicDir = path.resolve(process.argv[3] || "../../client/public");

// A showing page counts only once it exists in the build; until then the CTA emails instead of 404ing.
const pageExists = (p) => !!p && [path.join(publicDir, p, "index.html"), path.join(publicDir, p + ".html")].some((f) => fs.existsSync(f));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (s) => String(s).replace(/<[^>]+>/g, "");
const money = (n) => "$" + Number(n).toLocaleString("en-US");
const num = (n) => Number(n).toLocaleString("en-US");
const longDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const yesNo = (v) => (v ? "Yes" : "None");

function relatedHtml(L, all) {
  const others = all
    .filter((o) => o.slug !== L.slug && o.status === "sold" && o.address.city === L.address.city)
    .sort((x, y) => (y.soldDate || "").localeCompare(x.soldDate || ""))
    .slice(0, 6);
  const links = others.map((o) => `  <li><a href="/${o.slug}/facts/">${esc(o.address.street)}</a>: sold ${money(o.soldPrice)}, ${new Date(o.soldDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" })}</li>`);
  return `
<h2>More ${esc(L.address.city)} sales by ${AGENT.name}</h2>
${links.length ? `<ul>\n${links.join("\n")}\n</ul>` : ""}
<p><a href="/sales/">See every home sale Patrick MacCartee has closed →</a></p>`;
}

function build(L, all = []) {
  const sold = L.status === "sold";
  const pending = L.status === "pending";
  const a = L.address;
  const full = `${a.street}, ${a.city}, ${a.state}${a.zip ? " " + a.zip : ""}`;
  const url = `${SITE}/${L.slug}/facts/`;
  const price = sold ? L.soldPrice : L.listPrice;
  const ppsf = Math.round(price / L.sqft);
  const acres = (L.lotSqft / 43560).toFixed(2);
  const statusLabel = sold ? "Sold" : pending ? "Pending" : "Active · For Sale";
  const showing = pageExists(L.showingPage) ? L.showingPage : null;
  const showingHref = showing || `mailto:${AGENT.email}?subject=${encodeURIComponent(`${a.street} Showing`)}`;
  // On buyer-side sales Patrick was not the seller's agent, so the structured data must not say he was.
  const listedByAgent = L.representation !== "buyer";
  const repLine = L.representation === "buyer" ? "represented the buyer" : L.representation === "both" ? "represented both the buyer and the seller" : "represented the seller";
  const priceLine = sold
    ? `Sold for ${money(L.soldPrice)} on ${longDate(L.soldDate)} (listed at ${money(L.listPrice)})`
    : `Listed at ${money(L.listPrice)}`;

  // Opening answer paragraph — the single most-quoted block on the page.
  const lead = sold
    ? `${a.street} is ${L.summary} It <strong>sold for ${money(L.soldPrice)}</strong> on ${longDate(L.soldDate)} (about ${money(ppsf)} per sq ft), after listing at ${money(L.listPrice)}. ${AGENT.name} of ${AGENT.brokerage} ${repLine}.`
    : `${a.street} is ${L.summary} It is <strong>listed at ${money(L.listPrice)}</strong> (about ${money(ppsf)} per sq ft).${L.hoa ? "" : " No HOA."}`;

  // Core facts table, then listing-specific extras.
  const rows = [
    ["Address", full],
    ["Status", sold ? `Sold ${longDate(L.soldDate)}` : `${pending ? "Pending" : "Active"} (listed ${longDate(L.listDate)})`],
    sold ? ["Sold price", `${money(L.soldPrice)} (~${money(ppsf)} per sq ft)`] : ["List price", `${money(L.listPrice)} (~${money(ppsf)} per sq ft)`],
    sold ? ["List price", money(L.listPrice)] : null,
    sold && L.listPrice ? ["Sale-to-list ratio", `${Math.round((L.soldPrice / L.listPrice) * 100)}%`] : null,
    L.dom != null ? ["Days on market", String(L.dom)] : null,
    L.mls ? ["MLS number", `${L.mls} (bridgeMLS)`] : null,
    ["Property type", L.type],
    ["Bedrooms / bathrooms", `${L.beds} bedrooms / ${L.baths} bathrooms${L.singleStory ? ", all on one level" : ""}`],
    ["Living area", `±${num(L.sqft)} sq ft (public records)`],
    L.singleStory != null ? ["Stories", L.singleStory ? `One story${L.levelIn ? ", level-in entry (no stairs)" : ""}` : "Multi-level"] : null,
    L.lotSqft ? ["Lot size", `${num(L.lotSqft)} sq ft (${acres} acre)`] : null,
    ["Year built", String(L.yearBuilt)],
    L.neighborhood ? ["Neighborhood", L.neighborhood] : null,
    L.rooms ? ["Total rooms", String(L.rooms)] : null,
    L.garage ? ["Parking", L.garage] : null,
    L.heating != null ? ["Heating / cooling", `${L.heating} heat; ${L.ac ? "air conditioning" : "no air conditioning"}`] : null,
    L.solar != null && L.pool != null ? ["Solar / pool", `${yesNo(L.solar)} / ${yesNo(L.pool).toLowerCase()}`] : null,
    L.hoa != null ? ["HOA", L.hoa ? L.hoa : "None"] : null,
    ["County", L.county],
    L.schoolDistrict ? ["School district", `${L.schoolDistrict} (verify assignment with the district)`] : null,
    ...(L.facts || []),
    sold ? ["Representation", `${AGENT.name}, ${AGENT.brokerage}, ${repLine}`] : null,
  ].filter(Boolean);

  // FAQs: generated from the data first, then listing-specific ones.
  const faqs = [
    sold
      ? [`What did ${a.street} sell for?`, `${a.street} sold for ${money(L.soldPrice)} on ${longDate(L.soldDate)}, about ${money(ppsf)} per square foot based on approximately ${num(L.sqft)} square feet. It was listed at ${money(L.listPrice)}.`]
      : [`What is the list price of ${a.street}?`, `${money(L.listPrice)}, about ${money(ppsf)} per square foot based on approximately ${num(L.sqft)} square feet.`],
    L.singleStory ? [`Is ${a.street} single story?`, `Yes. It is single-story${L.levelIn ? " with a level-in entry, so there are no stairs to enter and no stairs inside" : ""}. All ${L.beds} bedrooms and all ${L.baths} bathrooms are on one level.`] : null,
    ...(L.faqs || []),
    L.hoa != null ? ["Is there an HOA?", L.hoa ? `Yes: ${L.hoa}.` : "No."] : null,
    L.ac != null && L.solar != null && L.heating ? ["Does it have air conditioning or solar?", `${L.ac ? "It has air conditioning" : "No air conditioning"} and ${L.solar ? "has solar" : "no solar"}. Heat is ${L.heating.toLowerCase()}.`] : null,
    L.lotSqft ? ["How big is the lot, and is there parking?", `${num(L.lotSqft)} sq ft (${acres} acre).${L.garage ? " " + L.garage + "." : ""}`] : null,
    sold
      ? [`Who ${repLine.replace("represented", "represented")} in the sale of ${a.street}?`, `${AGENT.name} of ${AGENT.brokerage} (DRE #${AGENT.dre}) ${repLine}. Contact: ${AGENT.phone}, ${AGENT.email}.`]
      : ["How do I see the home or get disclosures?", `Contact the listing agent, ${AGENT.name}, at ${AGENT.phone} or ${AGENT.email}.${showing ? " You can also request a showing on the property page." : ""}${L.propertySite ? " Open house times are posted at " + L.propertySite.replace(/^https?:\/\//, "") + "." : ""}`],
  ].filter(Boolean);

  // Structured data.
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        name: full,
        url,
        description: plain(`${a.street} is ${L.summary}`),
        datePosted: L.listDate,
        image: (L.images || []).map((i) => SITE + i[0]),
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: "USD",
          availability: sold ? "https://schema.org/SoldOut" : pending ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
          ...(sold ? { validThrough: L.soldDate } : {}),
          ...(listedByAgent ? { seller: { "@id": `${SITE}/#agent` } } : {}),
        },
        about: { "@id": `${url}#home` },
        ...(listedByAgent ? { provider: { "@id": `${SITE}/#agent` } } : {}),
        ...(L.mls ? { identifier: { "@type": "PropertyValue", propertyID: "bridgeMLS", value: L.mls } } : {}),
      },
      {
        "@type": "SingleFamilyResidence",
        "@id": `${url}#home`,
        name: a.street,
        address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, ...(a.zip ? { postalCode: a.zip } : {}), addressCountry: "US" },
        containedInPlace: { "@type": "Place", name: `${L.area}, ${L.county} County, California` },
        ...(L.rooms ? { numberOfRooms: L.rooms } : {}),
        numberOfBedrooms: L.beds,
        numberOfBathroomsTotal: L.baths,
        floorSize: { "@type": "QuantitativeValue", value: L.sqft, unitCode: "FTK" },
        yearBuilt: L.yearBuilt,
        amenityFeature: [
          ["Single story", L.singleStory],
          ["Level-in entry (no stairs to enter)", L.levelIn],
          ["Air conditioning", L.ac],
          ["Solar", L.solar],
          ["Pool", L.pool],
          ["HOA", L.hoa == null ? null : !!L.hoa],
        ].filter(([, v]) => v != null).map(([name, value]) => ({ "@type": "LocationFeatureSpecification", name, value })),
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE}/#agent`,
        name: AGENT.name,
        url: SITE + "/",
        telephone: "+1-" + AGENT.phone,
        email: AGENT.email,
        identifier: { "@type": "PropertyValue", propertyID: "California DRE", value: AGENT.dre },
        worksFor: { "@type": "RealEstateAgent", name: AGENT.brokerage, url: AGENT.brokerageUrl },
        areaServed: AGENT.areas,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          ...(showing ? [{ "@type": "ListItem", position: 2, name: a.street, item: SITE + showing }] : []),
          { "@type": "ListItem", position: showing ? 3 : 2, name: "Facts & FAQ", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([q, ans]) => ({ "@type": "Question", name: plain(q), acceptedAnswer: { "@type": "Answer", text: plain(ans) } })),
      },
    ],
  };

  const hero = (L.images || [])[0];
  const title = `${full} — ${sold ? "Sold Price" : "Price"}, Facts & FAQ | ${L.beds} Bed, ${L.baths} Bath${L.singleStory ? " Single-Story" : ""} Home${sold ? "" : " For Sale"}`;
  const metaDesc = `${full} (${L.area}): ${L.beds} bed, ${L.baths} bath, ±${num(L.sqft)} sq ft${L.singleStory ? " single-story" : ""} home on a ${num(L.lotSqft)} sq ft lot. ${sold ? `Sold for ${money(L.soldPrice)}` : `Listed at ${money(L.listPrice)}`}. Full facts and FAQ.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(metaDesc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(`${full} — ${sold ? "Sold" : "Facts, Price & FAQ"}`)}">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:url" content="${url}">
${hero ? `<meta property="og:image" content="${SITE}${hero[0]}">` : ""}
${HEAD_EXTRAS}
<script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, "\\u003c")}
</script>
<style>
  :root { --ink:#1f1d1b; --ink-2:#4a4540; --rule:#e2ddd6; --accent:#8b1e2d; --bg:#ffffff; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.65 -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; }
  main { max-width:760px; margin:0 auto; padding:40px 16px 64px; }
  nav.crumbs { font-size:13px; color:var(--ink-2); margin-bottom:24px; }
  nav.crumbs a { color:var(--ink-2); }
  h1 { font-family:Georgia, "Times New Roman", serif; font-weight:400; font-size:34px; line-height:1.15; margin:0 0 6px; }
  .sub { font-size:16px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-2); margin:0 0 20px; }
  .status { display:inline-block; background:${sold ? "var(--ink)" : "var(--accent)"}; color:#fff; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; padding:4px 10px; margin-bottom:14px; }
  .answer { font-size:18px; line-height:1.6; margin:0 0 28px; }
  h2 { font-family:Georgia, "Times New Roman", serif; font-weight:400; font-size:24px; margin:40px 0 12px; padding-bottom:6px; border-bottom:1px solid var(--rule); }
  h3 { font-size:17px; margin:22px 0 4px; }
  table { width:100%; border-collapse:collapse; font-size:16px; }
  th, td { text-align:left; padding:8px 0; border-bottom:1px solid var(--rule); vertical-align:top; }
  th { width:42%; font-weight:400; color:var(--ink-2); padding-right:12px; }
  ul { padding-left:20px; margin:8px 0; }
  li { margin:4px 0; }
  figure { margin:0 0 24px; }
  figure img { width:100%; height:auto; display:block; }
  figcaption { font-size:13px; color:var(--ink-2); margin-top:6px; }
  a { color:var(--accent); }
  .contact { margin-top:40px; padding:20px; border:1px solid var(--rule); }
  .fine { font-size:12px; color:var(--ink-2); margin-top:32px; line-height:1.5; }
</style>
</head>
<body>
<main>

<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › ${showing ? `<a href="${showing}">${esc(a.street)}</a> › ` : ""}Facts &amp; FAQ</nav>

<span class="status">${statusLabel}</span>
<h1>${esc(full)}</h1>
<p class="sub">${esc(L.area)} · ${esc(L.county)} County · ${esc(priceLine)}</p>

<p class="answer">${lead}</p>
${hero ? `
<figure>
  <img src="${hero[0]}" alt="${esc(hero[1])}" width="${hero[2]}" height="${hero[3]}" loading="eager">
  <figcaption>${esc(hero[1])}.</figcaption>
</figure>` : ""}

<h2>Key facts</h2>
<table>
${rows.map(([k, v]) => `  <tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("\n")}
</table>

${Object.keys(L.features || {}).length ? "<h2>Features</h2>" : ""}
${Object.entries(L.features || {}).map(([h, items]) => `<h3>${esc(h)}</h3>\n<ul>\n${items.map((i) => `  <li>${esc(i)}</li>`).join("\n")}\n</ul>`).join("\n")}
${L.location ? `
<h2>Location</h2>
<p>${esc(L.location.intro)}</p>
<ul>
${L.location.points.map((p) => `  <li>${p}</li>`).join("\n")}
</ul>` : ""}

${relatedHtml(L, all)}
<h2>Frequently asked questions</h2>
${faqs.map(([q, ans]) => `<h3>${esc(q)}</h3>\n<p>${esc(ans)}</p>`).join("\n")}

<div class="contact">
  <strong>${sold ? (L.representation === "buyer" ? "Buyer's agent" : "Listing agent") : "Listing agent"}:</strong> ${AGENT.name}, ${AGENT.brokerage} · DRE #${AGENT.dre}<br>
  ${AGENT.phone} · <a href="mailto:${AGENT.email}">${AGENT.email}</a> · <a href="${SITE}">realtor510.com</a>${!sold && L.showingPage ? `<br><a href="${showingHref}">Request a showing →</a>` : ""}${sold ? `<br>Thinking about selling nearby? <a href="/sell">See what your home could sell for →</a>` : ""}
</div>

<p class="fine">Last updated ${longDate(L.lastUpdated)}. Information deemed reliable but not guaranteed. Square footage is approximate and from public records. Based on information from bridgeMLS; buyers should independently verify all information, including school assignments, and conduct their own inspections.</p>

</main>
</body>
</html>
`;
  return { html, url, full, sold, price, L };
}

const files = fs.readdirSync(listingsDir).filter((f) => f.endsWith(".json")).sort();
const all = files.map((f) => JSON.parse(fs.readFileSync(path.join(listingsDir, f), "utf8")));
const out = [];
for (const [i, f] of files.entries()) {
  const L = all[i];
  if (L.status === "sold" && (!L.soldPrice || !L.soldDate)) throw new Error(`${f}: status "sold" needs soldPrice and soldDate`);
  const r = build(L, all);
  if (L.showingPage && !pageExists(L.showingPage)) console.log(`note   ${L.slug}: ${L.showingPage} is not in the build yet, so "Request a showing" emails instead. Rebuild once it exists.`);
  const dir = path.join(publicDir, L.slug, "facts");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), r.html);
  out.push(r);
  console.log(`built  ${path.relative(process.cwd(), path.join(dir, "index.html"))}`);
}

const active = out.filter((r) => !r.sold);
const sold = out.filter((r) => r.sold).sort((x, y) => y.L.soldDate.localeCompare(x.L.soldDate)); // newest first
const line = (r) => `- [${r.full} — ${r.sold ? "sold" : "facts, price & FAQ"}](${r.url}): ${r.L.beds} bd / ${r.L.baths} ba, ±${num(r.L.sqft)} sq ft${r.L.singleStory ? " single-story" : ""}, ${r.sold ? "sold " + money(r.price) + " (" + r.L.soldDate.slice(0, 7) + ")" : money(r.price)}, ${r.L.area}.`;
console.log("\n--- llms.txt (replace these two sections) ---");
if (active.length) console.log("## Current Listings\n" + active.map(line).join("\n"));
if (sold.length) console.log("\n## Recent Sales\n" + sold.map(line).join("\n"));
console.log("\n--- sitemap.xml entries ---");
for (const r of out) console.log(`<url><loc>${r.url}</loc><lastmod>${r.L.lastUpdated}</lastmod></url>`);
