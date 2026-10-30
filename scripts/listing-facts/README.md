# Listing Fact Pages

One data file per listing becomes a fact page at `realtor510.com/<slug>/facts/`, built for AI search: an answer-first summary, a key-facts table, a buyer FAQ, and structured data.

## Where it lives in the repo
```
scripts/listing-facts/build-listing-facts.mjs
scripts/listing-facts/listings/<slug>.json
```
Output goes to `client/public/<slug>/facts/index.html`.

## Add a new listing
1. Copy `listings/22-kensington-court.json` to `listings/<new-slug>.json` and fill it in from the MLS sheet. Leave out any fact you can't verify.
2. From `scripts/listing-facts/`, run `node build-listing-facts.mjs`
3. Paste the printed llms.txt sections and sitemap lines into those files.
4. Deploy (merge to `main`; Cloudflare Pages builds it). No cache purge needed: Pages serves these with `max-age=0`, and `_headers` marks `/:slug/facts/*`, `/sales/*`, `llms.txt` and `sitemap.xml` as no-cache.

## When it sells
Set `"status": "sold"`, `"soldPrice"` and `"soldDate"` (YYYY-MM-DD), update `"lastUpdated"`, and rebuild. The page switches itself to a sold record: sold price and price per sq ft, "represented the seller" language, sold structured data, and a "thinking about selling nearby?" link in place of the showing link. Remove any feature bullets that only make sense while it's for sale (like "disclosures available from the listing agent"), along with offer terms such as financing accepted and possession. Add `"dom"` (days on market) from the MLS, and set `"showingPage"` and `"propertySite"` to `null`. Use `"pending"` while it's in contract.

If the sale has a Notable Transaction story under `/blog/`, set `"storyPage"` to its path (for example `"/blog/22-kensington-court-kensington/"`). The sold page then links to it ("See how it sold →") right under the opening answer and names it in the structured data. Like `showingPage`, it's linked only once that page exists in `client/public`.

Then take the home off the homepage's hand-maintained Current Listings (`index.html`, `.cl-card`).

For a buyer-side sale you want on the site, add a sold file with `"representation": "buyer"`.

## Rules baked in
- Web number is 510-859-4895. The 415 number is for mailed pieces only, so it never appears here.
- No open house dates on these pages, because AI tools keep repeating them after they've passed. Link to the property site instead.
- School info always says to verify with the district.
- Reading copy is 16px minimum (CLAUDE.md type floor), so the facts table and the price line are 16px.
- Every page carries the site's favicon and analytics block (GA4, Meta Pixel, Cloudflare Web Analytics), same as the other property pages.
- On buyer-side sales the structured data never lists Patrick as the seller or listing provider.
- `showingPage` is linked only once that page exists in `client/public`. Until then "Request a showing" opens an email, so nothing links to a 404. Rebuild after the landing page ships.
