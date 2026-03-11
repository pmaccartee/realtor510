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
  
  // Clean up ALL PREVIOUS ATTEMPTS so they don't conflict
  content = content.replace(/<body>\s*<nav class="react-header-wrapper">[\s\S]*?<\/nav>/, '<body>');
  
  // Re-insert exact HTML immediately after body tag
  const htmlNavReplacement = `<header class="react-header-wrapper">
  <div class="react-header-inner">
    <a href="/" class="react-header-logo-link">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" class="react-header-logo-img">
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
</header>`;

  content = content.replace(/<body>\s*/, '<body>\n' + htmlNavReplacement + '\n');
  
  fs.writeFileSync(file, content);
  console.log(`Fully reset navigation structure in ${file}`);
});
