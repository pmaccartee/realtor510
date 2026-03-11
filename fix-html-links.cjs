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
  
  // Make sure to remove any smooth scroll behavior from CSS that might interfere with instant jumps
  content = content.replace(/html\s*\{[\s\S]*?scroll-behavior:\s*smooth;[\s\S]*?\}/, '');
  
  // Also fix the JavaScript to be robust on HTML pages
  const robustScrollJS = `
<script>
  // Ensure the page loads at the top, handling both load and DOMContentLoaded events
  // with a slight delay to combat browser native scroll restoration
  function forceScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setTimeout(function() { window.scrollTo(0, 0); }, 50);
  }
  
  window.addEventListener('load', forceScrollToTop);
  window.addEventListener('DOMContentLoaded', forceScrollToTop);
  
  // Also intercept hash links just in case
  if (window.location.hash) {
    setTimeout(function() { window.scrollTo(0, 0); }, 1);
  }
</script>
`;

  // Replace the old simple script with the robust one
  content = content.replace(/<script>\s*\/\/\s*Ensure the page loads at the top[\s\S]*?<\/script>/, robustScrollJS);
  
  fs.writeFileSync(file, content);
  console.log(`Made scroll reset robust in ${file}`);
});
