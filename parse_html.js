const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('/tmp/trends_page.html', 'utf8');
const $ = cheerio.load(html);

const qa = [];
// Based on the squarespace source code, there's usually an accordion block. Let's look for them:
$('.accordion-item').each((i, el) => {
    const question = $(el).find('.accordion-item__title').text().trim();
    const answer = $(el).find('.accordion-item__description').text().trim();
    if (question && answer) {
        qa.push({ question, answer });
    }
});

if (qa.length === 0) {
   // Let's try h3 and p
   $('h3, h2').each((i, el) => {
      const q = $(el).text().trim();
      let a = '';
      let next = $(el).next();
      while(next.length && next[0].tagName.toLowerCase() === 'p') {
          a += next.text().trim() + '\n\n';
          next = next.next();
      }
      if (q.includes('?') && a) {
          qa.push({ question: q, answer: a.trim() });
      }
   });
}

// Fallback: look for script tags with JSON
if (qa.length === 0) {
    const scripts = $('script[type="application/json"]');
    scripts.each((i, el) => {
        const text = $(el).html();
        if (text && text.includes('accordion') || text.includes('?') || text.includes('html')) {
            console.log("Found JSON payload of length", text.length);
        }
    });
}

fs.writeFileSync('/tmp/qa.json', JSON.stringify(qa, null, 2));
console.log('Saved ' + qa.length + ' items to /tmp/qa.json');
