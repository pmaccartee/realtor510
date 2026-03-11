const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html',
  'client/public/berkeley-hills-guide.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Make the neighborhood sub-nav sticky properly below the fixed header
  const stickyCSS = `
  /* ── Mobile Layout Fixes ── */
  .neigh-nav {
    position: sticky !important;
    top: 80px !important; /* right below the fixed header */
    z-index: 40 !important;
  }
  
  @media (max-width: 768px) {
    .neigh-nav-inner {
      padding: 0 16px !important;
    }
    
    .neigh-nav a {
      padding: 0 12px !important;
      font-size: 0.55rem !important;
    }
  }
  `;

  if (!content.includes('/* ── Mobile Layout Fixes ── */')) {
    content = content.replace('</style>', stickyCSS + '\n</style>');
  }
  
  fs.writeFileSync(file, content);
  console.log(`Fixed subnav in ${file}`);
});
