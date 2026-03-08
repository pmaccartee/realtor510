const fs = require('fs');

const articles = JSON.parse(fs.readFileSync('/tmp/all_articles.json', 'utf8'));

// Only filter out "blog post title" exactly. The previous filter was filtering out real articles because it was checking `a.id.includes('blog-post-title')` which caught real URLs that happened to have that string if Squarespace generated it weirdly.
const validArticles = articles.filter(a => {
  const isGeneric = a.title.toLowerCase().includes('blog post title') && a.title.length < 30;
  return !isGeneric && a.content.length > 50;
});

const code = 'export const insights = ' + JSON.stringify(validArticles, null, 2) + ';\n';
fs.writeFileSync('client/src/data/insights.ts', code);
console.log(`Wrote ${validArticles.length} valid articles to insights.ts`);
