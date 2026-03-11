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
  
  // Replace the entire Site Header CSS block
  const cssReplacement = `/* ── Site Header (Exactly matches React) ── */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 50;
    background-color: #ffffff;
    border-bottom: 1px solid hsl(0, 0%, 90%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: block;
    height: 80px; /* 5rem */
  }
  
  nav > div {
    max-width: 1280px; /* 80rem */
    margin: 0 auto;
    padding: 0 24px; /* 1.5rem */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  
  nav > div > a:first-child {
    display: block;
    text-decoration: none;
  }

  nav img {
    height: 48px; /* 3rem */
    width: auto;
    cursor: pointer;
    object-fit: contain;
    display: block;
  }
  
  .nav-links {
    display: none;
  }
  
  @media (min-width: 768px) {
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px; /* 2rem */
      margin: 0;
      padding: 0;
    }
  }
  
  .nav-links a {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; /* 0.875rem */
    line-height: 20px; /* 1.25rem */
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: hsl(0, 0%, 15%);
    text-decoration: none;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-links a:hover {
    color: hsl(355, 75%, 35%);
  }
  
  .nav-links a:last-child {
    background-color: hsl(355, 75%, 35%);
    color: #ffffff !important;
    padding: 8px 24px; /* 0.5rem 1.5rem */
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; /* 0.875rem */
    line-height: 20px; /* 1.25rem */
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  .nav-links a:last-child:hover {
    background-color: hsla(355, 75%, 35%, 0.9);
  }

  .page-hero, .hero {
    padding-top: 152px !important; /* 80px header + 72px padding */
  }
  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header \(Exactly matches React\) ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  const htmlNavReplacement = `<nav>
  <div>
    <a href="/">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo">
    </a>
    <div class="nav-links">
      <a href="/buy">Buy</a>
      <a href="/sell">Sell</a>
      <a href="/answers">Answers</a>
      <a href="/reviews">Reviews</a>
      <a href="/neighborhoods">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')">Contact</a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<nav class="react-header-wrapper">[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
});
