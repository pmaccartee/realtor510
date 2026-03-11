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
  
  const cssReplacement = `/* ── Site Header ── */
  .react-nav-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    z-index: 50;
    display: flex;
    justify-content: center;
  }
  
  .react-nav-inner {
    max-width: 1280px;
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
  }
  
  .react-nav-logo img {
    height: 48px;
    width: auto;
    object-fit: contain;
    display: block;
  }
  
  .react-nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
    margin: 0;
    padding: 0;
  }
  
  .react-nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #262626;
    text-decoration: none;
    transition: color 0.15s ease-in-out;
  }
  
  .react-nav-link:hover {
    color: hsl(355, 75%, 35%);
  }
  
  .react-nav-btn {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background-color: hsl(355, 75%, 35%);
    color: #ffffff !important;
    padding: 8px 24px;
    text-decoration: none;
    transition: background-color 0.15s ease-in-out;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: inline-block;
  }
  
  .react-nav-btn:hover {
    background-color: hsla(355, 75%, 35%, 0.9);
  }
  
  @media (max-width: 768px) {
    .react-nav-links {
      display: none;
    }
  }

  .page-hero, .hero {
    padding-top: 80px !important;
  }

  /* ── Page Hero ── */`;
  
  // Replace the old CSS. Since we just put in `/* ── Tailwind Header Utilities...` we need to replace that.
  content = content.replace(/\/\* ── Tailwind Header Utilities[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  const htmlNavReplacement = `<nav class="react-nav-header">
  <div class="react-nav-inner">
    <a href="/" class="react-nav-logo">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo">
    </a>
    <div class="react-nav-links">
      <a href="/buy" class="react-nav-link">Buy</a>
      <a href="/sell" class="react-nav-link">Sell</a>
      <a href="/answers" class="react-nav-link">Answers</a>
      <a href="/reviews" class="react-nav-link">Reviews</a>
      <a href="/neighborhoods" class="react-nav-link">Neighborhoods</a>
      <a href="mailto:patrick@realtor510.com" class="react-nav-btn">Contact</a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<!-- EXACT REACT HEADER MATCH -->[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
  console.log(`Fixed header perfectly in ${file}`);
});
