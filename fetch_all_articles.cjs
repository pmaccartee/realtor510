const fs = require('fs');
const cheerio = require('cheerio');
const { execSync } = require('child_process');

const links = JSON.parse(fs.readFileSync('/tmp/all_links.json', 'utf8'));
const articles = [];

for (const link of links) {
    // Only process valid trend article links, exclude the author page
    if (link === '/trends/author/patrick+maccartee') continue;
    
    const url = `https://www.realtor510.com${link}`;
    console.log(`Fetching ${url}...`);
    try {
        const html = execSync(`curl -sL "${url}"`).toString();
        const $ = cheerio.load(html);
        
        // Extract title (h1 or h2)
        const title = $('h1, h2').first().text().trim();
        
        // Extract the article body
        let bodyText = '';
        
        // First try standard Squarespace content block
        $('.sqs-block-html .sqs-block-content p').each((i, el) => {
            const pText = $(el).text().trim();
            if (pText && !pText.includes(title)) {
                bodyText += pText + '\n\n';
            }
        });

        // If nothing found, try alternative blocks
        if (!bodyText.trim()) {
           $('.entry-content p, .blog-item-content p').each((i, el) => {
               const pText = $(el).text().trim();
               if (pText && !pText.includes(title)) {
                   bodyText += pText + '\n\n';
               }
           });
        }
        
        // Check for specific accordion content
        if (!bodyText.trim()) {
           $('.accordion-item__description').each((i, el) => {
               bodyText += $(el).text().trim() + '\n\n';
           });
        }
        
        // Meta description
        const metaDesc = $('meta[name="description"]').attr('content') || '';
        
        // Infer category from title
        let category = "Insights";
        const titleLower = title.toLowerCase();
        if (titleLower.includes('buyer') || titleLower.includes('seller') || titleLower.includes('downsizers') || titleLower.includes('upgraders')) {
            category = "Buyer/Seller Dynamics";
        } else if (titleLower.includes('offer') || titleLower.includes('negotiate') || titleLower.includes('escrow') || titleLower.includes('concessions') || titleLower.includes('clauses')) {
            category = "Negotiation";
        } else if (titleLower.includes('pricing') || titleLower.includes('inventory') || titleLower.includes('market') || titleLower.includes('value') || titleLower.includes('roi')) {
            category = "Market Intelligence";
        } else if (titleLower.includes('piedmont') || titleLower.includes('oakland') || titleLower.includes('berkeley') || titleLower.includes('alameda') || titleLower.includes('east bay') || titleLower.includes('neighborhoods')) {
            category = "Local Expertise";
        } else if (titleLower.includes('staging') || titleLower.includes('remodels') || titleLower.includes('improvements') || titleLower.includes('architecture')) {
            category = "Property Preparation";
        }
        
        // Only add if we got a valid title and some content
        if (title && title.length > 5 && bodyText.trim()) {
            articles.push({
                id: link.replace('/trends/', ''),
                title,
                category,
                description: metaDesc || "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers.",
                content: bodyText.trim()
            });
        }
    } catch (e) {
        console.error(`Failed to fetch ${url}`);
    }
}

fs.writeFileSync('/tmp/all_articles.json', JSON.stringify(articles, null, 2));
console.log(`Successfully saved ${articles.length} articles to /tmp/all_articles.json`);
