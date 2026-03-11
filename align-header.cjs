const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

const newHeader = `<nav class="site-header">
  <div class="site-header-inner">
    <a href="/" style="display: flex; align-items: center;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 48px; width: auto; object-fit: contain; cursor: pointer;">
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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace the entire nav block
  content = content.replace(/<nav class="fixed w-full z-50[\s\S]*?<\/nav>/, newHeader);
  
  // Update the CSS to ensure perfect side-by-side flex layout matching the main site
  const oldStylesRegex = /\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//;
  
  const updatedStyles = `/* ── Site Header ── */
  .site-header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 80px;
  }
  
  .site-header-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .site-nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .site-nav-links a:not(.contact-btn) {
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s;
  }

  .site-nav-links a:not(.contact-btn):hover {
    color: hsl(355, 75%, 35%);
  }

  .contact-btn {
    background: hsl(355, 75%, 35%);
    color: white !important;
    padding: 8px 24px;
    text-decoration: none;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background 0.2s;
    display: inline-block;
  }

  .contact-btn:hover {
    background: hsl(355, 75%, 25%);
  }
  
  /* Add top padding to hero to account for fixed header */
  .page-hero, .hero {
    padding-top: 120px !important;
  }

  @media (max-width: 768px) {
    .site-nav-links { display: none; }
  }

  /* ── Page Hero ── */`;
  
  content = content.replace(oldStylesRegex, updatedStyles);
  
  fs.writeFileSync(file, content);
});

console.log('Fixed header layout structure and alignment');
