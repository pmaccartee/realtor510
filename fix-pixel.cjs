const fs = require('fs');
const path = require('path');

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the noscript block
  const noscriptRegex = /<noscript><img height="1" width="1" style="display:none"\nsrc="https:\/\/www\.facebook\.com\/tr\?id=1438966301114887&ev=PageView&noscript=1"\n\/>\s*<\/noscript>\n/g;
  
  if (content.match(noscriptRegex)) {
    // Remove it from current location (which is in head)
    content = content.replace(noscriptRegex, '');
    
    // Insert it right after the <body> tag
    content = content.replace(/<body[^>]*>/i, match => match + '\n<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1438966301114887&ev=PageView&noscript=1" /></noscript>');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed pixel in ' + filePath);
  }
};

processFile('client/index.html');

const publicFiles = fs.readdirSync('client/public').filter(f => f.endsWith('.html'));
publicFiles.forEach(f => processFile(path.join('client/public', f)));
