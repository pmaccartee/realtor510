const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

const newHeader = `<header class="site-header">
  <a href="https://realtor510.com" class="logo-mark">
    <img src="/PM_LOGO_Red_1772927689333.png" alt="PM Logo" class="logo-svg" style="object-fit: contain;">
    <div class="logo-text">
      <span class="first">PATRICK</span>
      <span class="last">MacCARTEE</span>
    </div>
  </a>
  <nav class="site-nav-links">
    <a href="https://realtor510.com/buy">Buy</a>
    <a href="https://realtor510.com/sell">Sell</a>
    <a href="https://realtor510.com/neighborhoods">Neighborhoods</a>
    <a href="https://realtor510.com/insights">Insights</a>
  </nav>
</header>`;

const newStyles = `  /* ── Site Header ── */
  .site-header {
    background: var(--white);
    border-bottom: 1px solid var(--rule);
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo-mark {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  /* SVG PM mark */
  .logo-svg { width: 44px; height: 44px; }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .logo-text .first { 
    font-size: 9px; 
    font-weight: 700; 
    letter-spacing: .18em; 
    text-transform: uppercase; 
    color: var(--black);
  }

  .logo-text .last { 
    font-size: 9px; 
    font-weight: 700; 
    letter-spacing: .18em; 
    text-transform: uppercase; 
    color: var(--black);
  }

  .site-nav-links {
    display: flex;
    gap: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .site-nav-links::-webkit-scrollbar { display: none; }

  .site-nav-links a {
    font-size: .65rem;
    font-weight: 500;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--gray-mid);
    text-decoration: none;
    padding: 0 16px;
    height: 72px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color .15s, border-color .15s;
  }

  .site-nav-links a:hover { color: var(--black); }
  .site-nav-links a.active { 
    color: var(--crimson); 
    border-bottom-color: var(--crimson); 
  }`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace the header
  content = content.replace(/<nav class="site-nav">[\s\S]*?<\/nav>/, newHeader);
  
  // Replace header styles
  content = content.replace(/\/\* ── Site Nav ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, newStyles + '\n\n  /* ── Page Hero ── */');
  
  fs.writeFileSync(file, content);
});

console.log('Restored white header with logo on all 4 pages');
