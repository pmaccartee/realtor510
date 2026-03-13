# realtor510.com — Page Style Guide & Remediation Reference
## Canonical Reference: Crocker Highlands Guide (`/neighborhood/crocker-highlands`)

---

## IMPORTANT: Two Different Templates Are in Use

After auditing all 13 affected pages, they fall into **two distinct template families** that need different treatment.

---

## Template A — "Neighborhood Guide" (Crocker Style)

**Applies to:**
- `/neighborhood/alameda-neighborhood-guide/`
- `/neighborhood/berkeley-neighborhood-guide/`
- `/neighborhood/oakland-neighborhood-guide/`
- `/neighborhood/piedmont-neighborhood-guide/`
- `/neighborhood/piedmont-vs-rockridge/`
- `/neighborhood/crocker-highlands-trestle-glen-oakland/`
- `/neighborhood/selling-crocker-highlands-oakland/`
- `/neighborhood/piedmont-luxury-market` ✅ already fixed

These pages use a narrow editorial column (`max-width: 780px`), stat cells, h2 headings, blockquotes. Apply full Crocker CSS. See Section 1.

---

## Template B — "Listing Page"

**Applies to:**
- `/615-western-drive-richmond`
- `/293-elysian-fields-drive-oakland`
- `/298-elysian-fields-drive-oakland`
- `/1297-sunnyhills-road-oakland`
- `/1015-warfield-avenue-oakland`
- `/261-silverado-court-oakland`

These are property listing pages with dark heroes, photo galleries, and listing-specific layout. Do **NOT** convert to the neighborhood guide structure. Apply targeted color fixes only. See Section 2.

---

# Section 1 — Template A: Neighborhood Guide

## CSS Color Palette

```css
:root {
  --crimson: hsl(355, 75%, 35%);
  --crimson-dark: hsl(355, 75%, 28%);
  --black: #1a1a1a;
  --gray-body: #3a3a3a;
  --gray-mid: #6b6b6b;
  --gray-light: #e8e8e8;
  --gray-bg: #f5f5f5;
  --white: #ffffff;
  --rule: #d8d8d8;
}
```

No greens. No golds. No tans. No custom hex colors outside this palette.

## Page Structure

```
1. Fixed white header (.react-header-wrapper, 80px tall)
2. .page-hero — CRIMSON background, centered, Playfair h1
3. .page-wrap — max-width 780px, white background
   - .stat-row — 3-col light gray stat cells
   - h2 sections with crimson rule
   - blockquotes, tables, cards
   - .cta-block — dark (#1a1a1a) CTA at bottom of body
4. .neighborhood-bar — #f0f0f0 strip with links to other guides
5. .site-footer — #2a2a2a dark footer
```

## Hero

```css
.page-hero {
  background: var(--crimson);    /* NOT #1a1a1a, NOT dark */
  padding: 152px 48px 72px;      /* 152px = 80px header + 72px */
  text-align: center;
}
.page-hero h1       { color: var(--white); font-family: 'Playfair Display', serif; font-weight: 300; }
.page-hero .eyebrow { color: rgba(255,255,255,0.6); font-size: .65rem; letter-spacing: .2em; text-transform: uppercase; }
.page-hero .deck    { color: rgba(255,255,255,0.75); font-style: italic; font-family: 'Playfair Display', serif; }
```

Mobile override: `padding: 120px 24px 52px`

## Stat Cells

```css
.stat-row  { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); margin: 48px 0; }
.stat-cell { background: var(--gray-bg); padding: 28px 20px; text-align: center; }   /* NEVER dark */
.stat-num  { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 300; color: var(--crimson); display: block; line-height: 1; margin-bottom: 6px; }
.stat-label { font-size: .65rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--gray-mid); }
```

## h2 Headings

```css
h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 400; color: var(--black); margin: 52px 0 16px; }
h2::before { content: ''; display: block; width: 28px; height: 2px; background: var(--crimson); margin-bottom: 12px; }
```

## Blockquotes

```css
blockquote {
  border-left: 3px solid var(--crimson);
  margin: 40px 0; padding: 8px 0 8px 28px;
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem; font-style: italic; color: var(--crimson-dark);
}
```

## Delta / Percentage Values

- **Positive / over-ask / up:** `color: var(--crimson)` — NOT green
- **Negative / under-ask / down:** `color: var(--gray-mid)` — NOT red, NOT green
- `.up` class in trend tables: `color: var(--crimson)` (was `#2a6e3a`)

## Table Highlights

```css
.comp-highlight { background: hsl(355, 20%, 96%); }   /* pale crimson — NOT tan */
.standout-badge { background: var(--crimson); color: white; }
```

## Find & Replace Checklist — Template A

| Find | Replace |
|---|---|
| `background: var(--ink)` on hero or `.hero { background: #1a1a1a` | `background: var(--crimson)` |
| `hero::before { background: linear-gradient(` | Delete entire `::before` rule |
| `.stats-box { background: var(--ink)` or `background: #1a1a1a` | Restyle as `.stat-cell { background: var(--gray-bg) }` |
| `color: #7BC995` | `color: var(--crimson)` |
| `color: #7EC8A0` | `color: var(--crimson)` |
| `color: #2a6e3a` | `color: var(--crimson)` |
| `background: #F5EDD6` or `var(--gold-light)` | `background: hsl(355, 20%, 96%)` |
| `--gold:` and `--gold-light:` in `:root` | Delete both lines |
| `btn-primary:hover { background: #A07C20` | `background: var(--crimson-dark)` |
| `.over-ask { color: #7BC995` | `color: var(--crimson)` |

---

# Section 2 — Template B: Listing Page Color Fixes Only

**Do NOT restructure these pages.** The dark hero is correct on listing pages — property photography belongs on a dark background. Apply only these targeted fixes:

| Find | Replace |
|---|---|
| `color: #7BC995` or `color: #7EC8A0` on stat/delta values | `color: var(--crimson)` |
| `--gold:` and `--gold-light:` in `:root` | Delete both lines; replace uses with `var(--crimson)` |
| `hero::before { background: linear-gradient(...rgba(184,150` (gold tint) | Delete entire `::before` rule |
| `background: #F5EDD6` (tan highlight) | `background: hsl(355, 20%, 96%)` |
| `btn-primary:hover { background: #A07C20` | `background: hsl(355, 75%, 28%)` |

The dark hero background on listing pages is intentional and correct — leave it.

---

# Shared Elements (Both Templates)

## Standard Header

```html
<header class="react-header-wrapper">
  <div class="react-header-inner">
    <a href="/" class="react-header-logo-link">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" class="react-header-logo-img">
    </a>
    <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
    </button>
    <div class="react-header-links desktop-only">
      <a href="/buy" class="react-header-link">Buy</a>
      <a href="/sell" class="react-header-link">Sell</a>
      <a href="/reviews" class="react-header-link">Reviews</a>
      <a href="/neighborhoods" class="react-header-link">Neighborhoods</a>
      <a href="/blog" class="react-header-link">Blog</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5,1,0].join('') + [8,5,9].join('') + [4,8,9,5].join('')" class="react-header-btn">Contact</a>
    </div>
  </div>
  <div id="mobile-menu" class="mobile-menu-overlay hidden">
    <div class="mobile-menu-content">
      <a href="/buy" class="mobile-nav-link">Buy</a>
      <a href="/sell" class="mobile-nav-link">Sell</a>
      <a href="/reviews" class="mobile-nav-link">Reviews</a>
      <a href="/neighborhoods" class="mobile-nav-link">Neighborhoods</a>
      <a href="/blog" class="mobile-nav-link">Blog</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5,1,0].join('') + [8,5,9].join('') + [4,8,9,5].join('')" class="mobile-nav-btn">Contact</a>
    </div>
  </div>
</header>
<script>
  document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
</script>
```

## Standard Footer (Neighborhood Guide pages)

```html
<footer class="site-footer">
  <p class="footer-name">PATRICK M<sup>ac</sup>CARTEE</p>
  <p class="footer-dre">DRE# 02142693</p>
  <nav class="footer-links">
    <a href="https://realtor510.com/waters">Alice Waters</a>
    <a href="https://realtor510.com/julia-morgan/">Julia Morgan</a>
    <a href="https://realtor510.com/privacy">Privacy</a>
    <a href="https://realtor510.com/terms">Terms</a>
    <a href="https://realtor510.com/contact">Contact</a>
  </nav>
</footer>
```

## Analytics Tags (every page)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6DDVCG0Q3F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6DDVCG0Q3F');
</script>
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1438966301114887');fbq('track','PageView');
</script>
<!-- Cloudflare Beacon -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8c78df7c7c0f484497ecbca7046644da1771523124516"
  data-cf-beacon='{"token":"7790379adaac4fcbbd5f81c0d86b8412"}'
  crossorigin="anonymous"></script>
```
