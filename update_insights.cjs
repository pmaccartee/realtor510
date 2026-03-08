const fs = require('fs');

const articles = JSON.parse(fs.readFileSync('/tmp/all_articles.json', 'utf8'));

// Filter out obvious placeholder posts from the original Squarespace site
const validArticles = articles.filter(a => {
  return !a.title.toLowerCase().includes('blog post title') &&
         !a.id.includes('blog-post-title') &&
         a.content.length > 50;
});

let code = 'export const insights = [\n';
validArticles.forEach((a, index) => {
  const content = a.content.replace(/\"/g, '\\"').replace(/\n/g, '\\n');
  const title = a.title.replace(/\"/g, '\\"');
  const desc = a.description.replace(/\"/g, '\\"');
  
  code += `  {
    "id": "${a.id}",
    "category": "${a.category}",
    "title": "${title}",
    "description": "${desc}",
    "content": "${content}"
  }${index < validArticles.length - 1 ? ',' : ''}\n`;
});
code += '];\n';

fs.writeFileSync('client/src/data/insights.ts', code);
console.log(`Wrote ${validArticles.length} valid articles to insights.ts`);
