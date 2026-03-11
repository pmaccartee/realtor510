const fs = require('fs');

// 1. Fix the HTML files to disable native scroll restoration
const htmlFiles = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html',
  'client/public/berkeley-hills-guide.html',
  'client/index.html'
];

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Script to disable native scroll restoration and force top scroll
  const robustScrollJS = `
<script>
  // Disable native browser scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force scroll to top on load and DOMContentLoaded
  function forceScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(function() { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, 10);
    setTimeout(function() { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, 50);
  }
  
  window.addEventListener('load', forceScrollToTop);
  window.addEventListener('DOMContentLoaded', forceScrollToTop);
  
  // Execute immediately just in case
  window.scrollTo(0, 0);
</script>
`;

  // Remove previous scripts if any
  content = content.replace(/<script>\s*\/\/\s*Ensure the page loads at the top[\s\S]*?<\/script>/, '');
  content = content.replace(/<script>\s*\/\/\s*Disable native browser scroll restoration[\s\S]*?<\/script>/, '');
  
  // Insert at the end of head so it runs early
  content = content.replace('</head>', robustScrollJS + '</head>');
  
  fs.writeFileSync(file, content);
  console.log(`Updated scroll logic in ${file}`);
});
