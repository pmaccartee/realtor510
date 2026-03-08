const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('/tmp/articles.json', 'utf8'));

fs.writeFileSync('/tmp/insights_data.json', JSON.stringify(articles, null, 2));
console.log('Saved formatted data to /tmp/insights_data.json');
