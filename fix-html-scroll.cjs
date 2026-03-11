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
  
  // Also add scroll-to-top for html pages since sometimes anchor clicks retain scroll position
  const scrollJS = `
<script>
  // Ensure the page loads at the top
  window.addEventListener('load', function() {
    window.scrollTo(0, 0);
  });
</script>
`;

  if (!content.includes('window.scrollTo(0, 0)')) {
    content = content.replace('</body>', scrollJS + '</body>');
    fs.writeFileSync(file, content);
    console.log(`Added scroll reset to ${file}`);
  }
});
