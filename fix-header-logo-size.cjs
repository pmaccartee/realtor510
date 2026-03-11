const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Update the max width and height of logo to match the React components precisely
  content = content.replace(
    /style="height: 48px; width: auto; object-fit: contain; cursor: pointer;"/, 
    'style="height: 48px; width: auto; object-fit: contain; cursor: pointer;" class="h-12 w-auto"'
  );

  fs.writeFileSync(file, content);
});

console.log('Fixed logo on the pages');
