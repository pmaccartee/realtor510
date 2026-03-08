const fs = require('fs');

// Read the current data
const dataFile = 'client/src/data/insights.ts';
let code = fs.readFileSync(dataFile, 'utf8');

// Extract the array
const match = code.match(/export const insights = (\[[\s\S]*\]);/);
if (match && match[1]) {
  let articles = JSON.parse(match[1]);
  
  // Clean up content
  articles = articles.map(a => {
    // Look for PATRICK MacCARTEE... and remove it from the end
    // Use a regular expression that catches the signature, including any non-breaking spaces
    a.content = a.content.replace(/PATRICK MacCARTEE[\s\S]*?DRE#\s*\d+/g, '').trim();
    return a;
  });
  
  const newCode = 'export const insights = ' + JSON.stringify(articles, null, 2) + ';\n';
  fs.writeFileSync(dataFile, newCode);
  console.log("Successfully removed signatures from articles.");
} else {
  console.log("Failed to parse insights array.");
}
