const fs = require('fs');

let insightsContent = fs.readFileSync('client/src/data/insights.ts', 'utf-8');

const newEntries = `  {
    "id": "trestle-glen-guide",
    "title": "Trestle Glen Real Estate Guide",
    "category": "Neighborhood Guide",
    "description": "A complete guide to buying and selling in Trestle Glen, Oakland — architecture, market dynamics, and neighborhood character.",
    "content": "",
    "link": "/trestle-glen-guide.html"
  },
  {
    "id": "crocker-highlands-guide",
    "title": "Crocker Highlands Real Estate Guide",
    "category": "Neighborhood Guide",
    "description": "A comprehensive guide to buying and selling in Crocker Highlands, Oakland — one of the East Bay's most coveted historic neighborhoods.",
    "content": "",
    "link": "/crocker-highlands-guide.html"
  }`;

if (!insightsContent.includes('trestle-glen-guide')) {
  insightsContent = insightsContent.replace(/\s+\}\s*\];/g, ',\n' + newEntries + '\n];');
  fs.writeFileSync('client/src/data/insights.ts', insightsContent);
  console.log('Added new entries to insights.ts');
} else {
  console.log('Entries already exist');
}
