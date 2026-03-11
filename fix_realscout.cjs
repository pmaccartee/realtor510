const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/trestle-glen-guide.html',
  'client/public/berkeley-hills-guide.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Ensure the link for the realscout buttons are updated to open in the same tab instead of popup window
  // Or just be a normal link if that's what's currently in there
  
  // Find all realscout links with javascript:void(0) and window.open
  content = content.replace(/href="javascript:void\(0\)" onclick="window\.open\('([^']+)', 'realscout', '[^']+'\); return false;"/g, 'href="$1" target="_blank"');
  
  fs.writeFileSync(file, content);
  console.log(`Fixed links in ${file}`);
});
