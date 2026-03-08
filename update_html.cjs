const fs = require('fs');

const html = fs.readFileSync('attached_assets/alice-waters-family-tree_(3)_1772934444149.html', 'utf8');
const escapedHtml = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
const tsContent = `export const aliceWatersHtml = \`${escapedHtml}\`;\n`;

fs.writeFileSync('client/src/data/aliceWatersHtml.ts', tsContent);
console.log('Updated aliceWatersHtml.ts with the new content!');
