const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('/tmp/all_articles.json', 'utf8'));
console.log("Total articles fetched initially:", articles.length);
articles.forEach(a => {
  if (a.title.toLowerCase().includes('blog post title') || a.id.includes('blog-post-title')) {
    console.log("Ignored:", a.title);
  } else if (a.content.length <= 50) {
    console.log("Ignored due to length:", a.title, "Length:", a.content.length);
  } else {
    // valid
  }
});
