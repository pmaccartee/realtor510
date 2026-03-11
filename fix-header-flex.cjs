const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Make sure the inner container is 100% width and display flex with space-between
  const cssReplacement = `/* ── Site Header ── */
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
    display: block; /* Added display block instead of flex on outer container */
  }
  
  .site-header-inner {
    max-width: 1280px; /* Adjust max width to match React exactly */
    width: 100%;
    padding: 0 24px;
    height: 100%;
    margin: 0 auto;
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
  
  content = content.replace(/\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  fs.writeFileSync(file, content);
});

console.log('Fixed header flex alignment correctly');
