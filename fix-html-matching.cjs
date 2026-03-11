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
  
  // 1. Update font imports
  const oldFontLink = /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Cormorant\+Garamond.*?rel="stylesheet">/;
  const newFontLink = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">`;
  
  if (content.match(oldFontLink)) {
    content = content.replace(oldFontLink, newFontLink);
  }

  // 2. Replace fonts in CSS globally
  content = content.replace(/'Cormorant Garamond', serif/g, "'Playfair Display', serif");
  content = content.replace(/'Jost', sans-serif/g, "'Montserrat', sans-serif");
  
  // 3. Perfect Match React Header CSS
  const cssReplacement = `/* ── Site Header (Exactly matches React) ── */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: #ffffff;
    border-bottom: 1px solid hsl(0, 0%, 90%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: block !important;
  }
  
  .site-header-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 5rem;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    box-sizing: border-box;
  }

  .site-nav-links {
    display: none !important;
  }

  @media (min-width: 768px) {
    .site-nav-links {
      display: flex !important;
      align-items: center !important;
      gap: 2rem !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  .site-nav-links a:not(.contact-btn) {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    font-weight: 400 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    color: hsl(0, 0%, 15%) !important;
    text-decoration: none !important;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .site-nav-links a:not(.contact-btn):hover {
    color: hsl(355, 75%, 35%) !important;
  }

  .contact-btn {
    background-color: hsl(355, 75%, 35%) !important;
    color: hsl(0, 0%, 100%) !important;
    padding: 0.5rem 1.5rem !important;
    text-decoration: none !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    font-weight: 400 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
    display: inline-block !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  }

  .contact-btn:hover {
    background-color: hsla(355, 75%, 35%, 0.9) !important;
  }
  
  .page-hero, .hero {
    padding-top: 5rem !important;
  }

  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  // 4. Update the HTML nav structure to exactly mirror the React component tags and styling
  const htmlNavReplacement = `<nav class="site-header">
  <div class="site-header-inner">
    <a href="/" style="display: flex; align-items: center; text-decoration: none; cursor: pointer;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 3rem; width: auto; object-fit: contain; display: block; cursor: pointer;">
    </a>
    <div class="site-nav-links">
      <a href="/buy">Buy</a>
      <a href="/sell">Sell</a>
      <a href="/answers">Answers</a>
      <a href="/reviews">Reviews</a>
      <a href="/neighborhoods">Neighborhoods</a>
      <a href="mailto:patrick@realtor510.com" class="contact-btn">Contact</a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<nav class="site-header">[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
  console.log(`Updated fonts and perfectly matched header in ${file}`);
});
