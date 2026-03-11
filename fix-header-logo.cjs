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
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 48px; width: auto; object-fit: contain; cursor: pointer;">
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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace the header again with the image logo instead of text
  content = content.replace(/<nav class="fixed w-full z-50 bg-white border-b border-border shadow-sm site-header">[\s\S]*?<\/nav>/, newHeader);
  
  fs.writeFileSync(file, content);
});

console.log('Updated headers with PM logo on all 4 pages');
