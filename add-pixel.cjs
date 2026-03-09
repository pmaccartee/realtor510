const fs = require('fs');
const path = require('path');

const pixelCode = `
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1438966301114887');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1438966301114887&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
</head>`;

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('1438966301114887')) {
    content = content.replace('</head>', pixelCode);
    fs.writeFileSync(filePath, content);
    console.log('Added pixel to ' + filePath);
  } else {
    console.log('Pixel already exists in ' + filePath);
  }
};

processFile('client/index.html');

const publicFiles = fs.readdirSync('client/public').filter(f => f.endsWith('.html'));
publicFiles.forEach(f => processFile(path.join('client/public', f)));
