const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace everything from /* ── Site Header ── */ to /* ── Page Hero ── */
  const cssReplacement = `/* ── Site Header ── */
  .site-header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 80px;
    display: block !important;
  }
  
  .site-header-inner {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    box-sizing: border-box;
  }

  .site-nav-links {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 32px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .site-nav-links a:not(.contact-btn) {
    font-family: 'Jost', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .site-nav-links a:not(.contact-btn):hover {
    color: hsl(355, 75%, 35%);
  }

  .contact-btn {
    background: hsl(355, 75%, 35%);
    color: white !important;
    padding: 8px 24px;
    text-decoration: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background 0.2s;
    display: inline-block;
    white-space: nowrap;
  }

  .contact-btn:hover {
    background: hsl(355, 75%, 25%);
  }
  
  .page-hero, .hero {
    padding-top: 152px !important; /* increased padding to prevent overlap */
  }

  @media (max-width: 768px) {
    .site-nav-links { display: none !important; }
  }

  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  // Clean up the HTML structure to be pristine
  const htmlReplacement = `<nav class="site-header">
  <div class="site-header-inner">
    <a href="/" style="display: block; flex-shrink: 0;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 48px; width: auto; display: block;">
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

  content = content.replace(/<nav class="site-header">[\s\S]*?<\/nav>/, htmlReplacement);
  
  fs.writeFileSync(file, content);
});

console.log('Fixed navigation styling');
