const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('/tmp/all_articles.json', 'utf8'));

const validArticles = articles.filter(a => {
  return !a.title.toLowerCase().includes('blog post title') &&
         !a.id.includes('blog-post-title') &&
         a.content.length > 50;
});

const code = 'export const insights = ' + JSON.stringify(validArticles, null, 2) + ';\n';
fs.writeFileSync('client/src/data/insights.ts', code);
console.log(`Wrote ${validArticles.length} valid articles to insights.ts using JSON.stringify`);
