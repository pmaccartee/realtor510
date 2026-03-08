const fs = require('fs');
const html = fs.readFileSync('/tmp/trends_page.html', 'utf8');

// Extract all unique trend links
const links = [...new Set(html.match(/\/trends\/[a-zA-Z0-9-]+/g))];
console.log(JSON.stringify(links.filter(l => l !== '/trends/waters'), null, 2));
