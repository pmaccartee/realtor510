const fs = require('fs');
const path = require('path');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Create a completely self-contained CSS block for the header to match React exactly
  const cssReplacement = `/* ── Site Header (Exactly matches React) ── */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: #ffffff;
    border-bottom: 1px solid hsl(0, 0%, 89.8%); /* border-border */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* shadow-sm */
    display: block !important;
  }
  
  .site-header-inner {
    max-width: 80rem; /* max-w-7xl */
    margin: 0 auto;
    padding: 0 1.5rem; /* px-6 */
    height: 5rem; /* h-20 */
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    box-sizing: border-box;
  }

  .site-nav-links {
    display: none !important; /* hidden by default on mobile */
  }

  @media (min-width: 768px) {
    .site-nav-links {
      display: flex !important;
      align-items: center !important;
      gap: 2rem !important; /* space-x-8 */
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  .site-nav-links a:not(.contact-btn) {
    font-family: inherit;
    font-size: 0.875rem !important; /* text-sm */
    line-height: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.1em !important; /* tracking-widest */
    text-transform: uppercase !important;
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .site-nav-links a:not(.contact-btn):hover {
    color: hsl(355, 75%, 35%) !important; /* hover:text-primary */
  }

  .contact-btn {
    background-color: hsl(355, 75%, 35%) !important; /* bg-primary */
    color: hsl(0, 0%, 100%) !important; /* text-primary-foreground */
    padding: 0.5rem 1.5rem !important; /* px-6 py-2 */
    text-decoration: none;
    font-family: inherit;
    font-size: 0.875rem !important; /* text-sm */
    line-height: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.1em !important; /* tracking-widest */
    text-transform: uppercase !important;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* shadow-sm */
  }

  .contact-btn:hover {
    background-color: hsla(355, 75%, 35%, 0.9) !important; /* hover:bg-primary/90 */
  }
  
  .page-hero, .hero {
    padding-top: 152px !important; /* account for 80px (5rem) header */
  }

  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  // Standardize the HTML structure too
  const htmlNavReplacement = `<nav class="site-header">
  <div class="site-header-inner">
    <a href="/" style="display: flex; align-items: center; text-decoration: none; cursor: pointer;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 3rem; width: auto; object-fit: contain; display: block;">
    </a>
    <div class="site-nav-links">
      <a href="/buy">Buy</a>
      <a href="/sell">Sell</a>
      <a href="/answers">Answers</a>
      <a href="/reviews">Reviews</a>
      <a href="/neighborhoods">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="contact-btn">Contact</a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<nav class="site-header">[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
  console.log(`Updated header in ${file}`);
});
