const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

const newHeader = `<nav class="site-nav">
  <a href="https://realtor510.com" class="nav-home">realtor510<span>.com</span></a>
  <div class="nav-links">
    <a href="https://realtor510.com/buy">Buy</a>
    <a href="https://realtor510.com/sell">Sell</a>
    <a href="https://realtor510.com/neighborhoods">Neighborhoods</a>
    <a href="https://realtor510.com/insights">Insights</a>
  </div>
</nav>`;

const newStyles = `  /* ── Site Nav ── */
  .site-nav {
    background: var(--black);
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .site-nav a.nav-home {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--white);
    text-decoration: none;
    white-space: nowrap;
    letter-spacing: .02em;
  }

  .site-nav a.nav-home span {
    color: var(--crimson);
  }

  .nav-links {
    display: flex;
    gap: 24px;
  }

  .nav-links a {
    font-size: .68rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #a09080;
    text-decoration: none;
    white-space: nowrap;
    transition: color .2s;
  }

  .nav-links a:hover {
    color: var(--white);
  }

  @media (max-width: 768px) {
    .site-nav { padding: 0 20px; }
    .nav-links { display: none; } /* Simplified mobile for static pages */
  }`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace the header
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, newHeader);
  
  // Replace header styles
  content = content.replace(/\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, newStyles + '\n\n  /* ── Page Hero ── */');
  
  fs.writeFileSync(file, content);
});

console.log('Replaced headers on all 4 pages');
