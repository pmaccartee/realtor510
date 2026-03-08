const fs = require('fs');

let content = fs.readFileSync('attached_assets/alice-waters-family-tree_(4)_1772989060095.html', 'utf-8');

// 1. Add Favicon if not present
if (!content.includes('<link rel="icon"')) {
  content = content.replace(
    /<head>([\s\S]*?)<title>/i, 
    '<head>$1<link rel="icon" href="/favicon.png" type="image/png">\n<title>'
  );
}

// 2. Add btn-red style and text-red styles just in case
if (!content.includes('.btn-red {')) {
  const css = `
  .btn-red { display: inline-block; background: hsl(355, 75%, 35%); color: white; padding: 14px 36px; text-decoration: none; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; transition: background 0.2s; text-align: center; border: none; cursor: pointer; }
  .btn-red:hover { background: hsl(355, 75%, 25%); color: white; }
  .text-red { color: hsl(355, 75%, 35%); text-decoration: underline; cursor: pointer; }
  .text-red:hover { color: hsl(355, 75%, 25%); }
`;
  content = content.replace('</style>', css + '</style>');
}

// 3. Obfuscate phone numbers and email links
const obfuscatedLink = `href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')"`;

// Replace typical contact methods
content = content.replace(/href="mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"/g, obfuscatedLink);
content = content.replace(/href="tel:[^"]+"/g, obfuscatedLink);

// Remove plain text phone numbers like 510.859.4895 or 510-859-4895
content = content.replace(/>\s*510[.\- ]?859[.\- ]?4895\s*</g, '>Contact Patrick<');
content = content.replace(/>\s*patrick@realtor510\.com\s*</g, '>Contact Patrick<');

// Replace any button classes with btn-red if needed (though the Waters page doesn't seem to have standard CTAs, we'll cover it just in case)
content = content.replace(/class="btn-hero"/g, 'class="btn-red"');
content = content.replace(/class="btn-sage"/g, 'class="btn-red"');

// Also update the static file
fs.writeFileSync('client/public/alice-waters.html', content);

// Update the React component content (it uses a string export)
const tsContent = `export const aliceWatersHtml = \`\n${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\n\`;\n`;
fs.writeFileSync('client/src/data/aliceWatersHtml.ts', tsContent);

console.log('Processed alice-waters file successfully');
