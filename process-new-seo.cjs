const fs = require('fs');

const files = [
  'client/public/trestle-glen-guide.html',
  'client/public/crocker-highlands-guide.html'
];

const obfuscatedLink = `href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')"`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // 1. Add Favicon if not present
  if (!content.includes('<link rel="icon"')) {
    content = content.replace(
      /<head>([\s\S]*?)<title>/i, 
      '<head>$1<link rel="icon" href="/favicon.png" type="image/png">\n<title>'
    );
  }

  // 2. Add btn-red style
  if (!content.includes('.btn-red {')) {
    const css = `
  .btn-red { display: inline-block; background: hsl(355, 75%, 35%); color: white; padding: 14px 36px; text-decoration: none; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; transition: background 0.2s; text-align: center; border: none; cursor: pointer; }
  .btn-red:hover { background: hsl(355, 75%, 25%); color: white; }
`;
    content = content.replace('</style>', css + '</style>');
  }

  // 3. Obfuscate mailto links
  content = content.replace(/href="mailto:patrick@realtor510\.com"/g, obfuscatedLink);
  content = content.replace(/href="tel:[^"]+"/g, obfuscatedLink);
  
  // 4. Update the cta-btn to use the new red button style if appropriate, or keep cta-btn.
  // We can just change class="cta-btn" to class="btn-red" for consistency
  content = content.replace(/class="cta-btn"/g, 'class="btn-red"');
  
  fs.writeFileSync(file, content);
});
console.log('Processed new SEO files.');
