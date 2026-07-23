# realtor510.com

Patrick MacCartee's real estate site (The Grubb Company, DRE# 02142693).
React/Vite SPA in `client/src` plus static HTML pages in `client/public/`
(blog posts, neighborhood guides) and at the repo root (`index.html`,
`buy.html`, `sell.html`). `script/build.ts` assembles everything into
`dist/public`.

## Contact info rules

- **Phone on the website is always 510-859-4895** (`tel:5108594895`) — every
  page, CTA button, and JSON-LD `telephone` field.
- **415-637-0257 is email-only.** It must never appear anywhere on the
  website, including structured data.
- Contact email on public pages: patrick@realtor510.com.

## Typography floor

- **All reading copy is 16px minimum.** This covers anything a reader is meant
  to read: body prose, table data cells (including comparison-table "vs." /
  percentage columns), list and grid labels, neighborhood-card links, related
  links, bylines, and editorial notes.
- **Fine print is exempt and stays visibly smaller (12–13px)** to preserve
  hierarchy: source/methodology notes under tables and charts, uppercase
  section kickers/eyebrows, footer legal, and signature/contact blocks (name,
  company, DRE line). Never below 12px.
