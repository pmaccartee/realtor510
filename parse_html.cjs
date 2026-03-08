const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('/tmp/trends_page.html', 'utf8');
const $ = cheerio.load(html);

const qa = [];

// Method 1: Accordion elements in squarespace often use data-description or specific classes
$('.accordion-item').each((i, el) => {
    const question = $(el).find('.accordion-item__title').text().trim() || $(el).find('.accordion-block-title').text().trim();
    const answer = $(el).find('.accordion-item__description').text().trim() || $(el).find('.accordion-block-description').text().trim() || $(el).find('.sqs-block-content p').text().trim();
    if (question && answer) {
        qa.push({ question, answer });
    }
});

// Method 2: Look through scripts for JSON payload
if (qa.length === 0) {
    $('script').each((i, el) => {
        const text = $(el).html();
        if (text && text.includes('accordion')) {
            try {
                // Try to find array of items
                const match = text.match(/"items":\s*(\[.*?\])/s);
                if (match && match[1]) {
                    const items = JSON.parse(match[1]);
                    items.forEach(item => {
                        if (item.title && item.description) {
                            // Extract text from description HTML
                            const descHtml = cheerio.load(item.description);
                            qa.push({
                                question: item.title,
                                answer: descHtml.text().trim()
                            });
                        }
                    });
                }
            } catch(e) {}
        }
    });
}

// Method 3: H3/H2 followed by P
if (qa.length === 0) {
   $('h3, h2').each((i, el) => {
      const q = $(el).text().trim();
      let a = '';
      let next = $(el).next();
      while(next.length && next[0].tagName && ['p', 'ul', 'div'].includes(next[0].tagName.toLowerCase())) {
          a += next.text().trim() + '\n\n';
          next = next.next();
      }
      if (q.includes('?') && a) {
          qa.push({ question: q, answer: a.trim() });
      }
   });
}

// Method 4: Specific sqs blocks
if (qa.length === 0) {
   $('.sqs-block-accordion').each((i, block) => {
       $(block).find('.accordion-item').each((j, item) => {
           const q = $(item).find('.accordion-item__title').text().trim();
           const a = $(item).find('.accordion-item__accordion-content').text().trim();
           if (q && a) qa.push({question: q, answer: a});
       });
   });
}

// Write the output
fs.writeFileSync('/tmp/qa.json', JSON.stringify(qa, null, 2));
console.log('Saved ' + qa.length + ' items to /tmp/qa.json');
if (qa.length > 0) {
    console.log("First item:", qa[0]);
}
