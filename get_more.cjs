const fs = require('fs');

try {
  const articles = JSON.parse(fs.readFileSync('/tmp/all_articles.json', 'utf8'));
  console.log("Total articles fetched initially:", articles.length);
  const titles = articles.map(a => a.title);
  console.log("Titles:");
  titles.forEach(t => console.log("- " + t));
} catch(e) {
  console.log(e);
}
