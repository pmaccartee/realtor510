const fs = require('fs');

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
  
  // This CSS perfectly copies the Tailwind computed styles from the home page.
  const cssReplacement = `/* ── Site Header (Exactly matches React) ── */
  .react-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: #ffffff;
    border-bottom: 1px solid hsl(0, 0%, 90%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 80px;
    display: flex;
    justify-content: center; /* This centers the inner container */
  }
  
  .react-header-inner {
    max-width: 1280px;
    width: 100%;
    padding: 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .react-header-logo img {
    height: 48px;
    width: auto;
    cursor: pointer;
    object-fit: contain;
  }
  
  .react-header-links {
    display: none;
  }
  
  @media (min-width: 768px) {
    .react-header-links {
      display: flex;
      align-items: center;
      gap: 32px;
    }
  }
  
  .react-header-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: hsl(0, 0%, 15%);
    text-decoration: none;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .react-header-link:hover {
    color: hsl(355, 75%, 35%);
  }
  
  .react-header-btn {
    background-color: hsl(355, 75%, 35%);
    color: #ffffff !important;
    padding: 8px 24px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  .react-header-btn:hover {
    background-color: hsla(355, 75%, 35%, 0.9);
  }

  .page-hero, .hero {
    padding-top: 152px !important; /* give enough space below 80px fixed header */
  }
  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header \(Exactly matches React\) ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  const htmlNavReplacement = `<nav class="react-header-wrapper">
  <div class="react-header-inner">
    <a href="/" style="display: block;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" class="react-header-logo">
    </a>
    <div class="react-header-links">
      <a href="/buy" class="react-header-link">Buy</a>
      <a href="/sell" class="react-header-link">Sell</a>
      <a href="/answers" class="react-header-link">Answers</a>
      <a href="/reviews" class="react-header-link">Reviews</a>
      <a href="/neighborhoods" class="react-header-link">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="react-header-btn">Contact</a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<nav class="react-header-wrapper">[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
});
