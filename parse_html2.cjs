const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('/tmp/trends_page.html', 'utf8');
const $ = cheerio.load(html);

const qa = [];

// Look for elements containing question marks
$('*').each((i, el) => {
    const text = $(el).text().trim();
    if (text.includes('?') && $(el).children().length === 0 && $(el).is('span, p, h1, h2, h3, h4, strong, a')) {
        let question = text;
        let answerText = '';
        
        // Find the next elements that are not headings
        let nextEl = $(el).parent().next();
        
        // If no parent next, try just next
        if (!nextEl.length) {
            nextEl = $(el).next();
        }
        
        // If parent has text after this element, use that
        if ($(el).parent().text().replace(text, '').trim()) {
            answerText = $(el).parent().text().replace(text, '').trim();
        } else {
            // Keep getting next siblings until another question or heading
            let depth = 0;
            while (nextEl.length && depth < 5) {
                if (nextEl.text().includes('?')) break;
                answerText += nextEl.text().trim() + '\n';
                nextEl = nextEl.next();
                depth++;
            }
        }
        
        if (answerText.trim() && question.length > 10) {
            qa.push({ question, answer: answerText.trim() });
        }
    }
});

fs.writeFileSync('/tmp/qa2.json', JSON.stringify(qa, null, 2));
console.log('Saved ' + qa.length + ' items to /tmp/qa2.json');
