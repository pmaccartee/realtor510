const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

const newHeader = `<nav class="fixed w-full z-50 bg-white border-b border-border shadow-sm site-header">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between w-full" style="max-width: 1280px; margin: 0 auto; width: 100%;">
    <a href="/" style="display: flex; align-items: center;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 48px; width: auto; object-fit: contain;">
    </a>
    <div class="site-nav-links hidden md-flex">
      <a href="/buy">Buy</a>
      <a href="/sell">Sell</a>
      <a href="/answers">Answers</a>
      <a href="/reviews">Reviews</a>
      <a href="/neighborhoods">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="contact-btn">Contact</a>
    </div>
  </div>
</nav>`;

const newStyles = `  /* ── Site Header ── */
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
    display: flex;
    align-items: center;
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
  }`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace the header
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, newHeader);
  
  // Replace header styles
  content = content.replace(/\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, newStyles + '\n\n  /* ── Page Hero ── */');
  
  fs.writeFileSync(file, content);
});

console.log('Replaced header with the exact standard React menu style');
