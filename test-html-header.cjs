const fs = require('fs');

const file = 'client/public/crocker-highlands-guide.html';
const content = fs.readFileSync(file, 'utf-8');

const navStart = content.indexOf('<nav class="site-header">');
const navEnd = content.indexOf('</nav>') + 6;

console.log(content.substring(navStart, navEnd));
