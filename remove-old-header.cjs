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
  
  // Remove the old unstyled site-header
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>\s*/, '');
  
  fs.writeFileSync(file, content);
  console.log(`Removed old header in ${file}`);
});
