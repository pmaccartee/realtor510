const fs = require('fs');
const path = require('path');

const gaCode = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6DDVCG0Q3F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6DDVCG0Q3F');
</script>
</head>`;

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('G-6DDVCG0Q3F')) {
    content = content.replace('</head>', gaCode);
    fs.writeFileSync(filePath, content);
    console.log('Added GA to ' + filePath);
  } else {
    console.log('GA already exists in ' + filePath);
  }
};

processFile('client/index.html');

const publicFiles = fs.readdirSync('client/public').filter(f => f.endsWith('.html'));
publicFiles.forEach(f => processFile(path.join('client/public', f)));
