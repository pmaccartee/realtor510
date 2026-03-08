const fs = require('fs');
const cheerio = require('cheerio');
const { execSync } = require('child_process');

const links = [
  "/trends/whats-your-approach-when-a-high-end-buyer-requests-excessive-credits-or-concessions",
  "/trends/how-do-you-create-leverage-when-theres-only-one-offer",
  "/trends/how-do-you-negotiate-with-agents-who-rely-heavily-on-mismatched-comps",
  "/trends/whats-your-approach-to-managing-escalation-clauses-in-a-luxury-deal",
  "/trends/how-do-you-coach-sellers-to-stay-rational-in-emotional-negotiations",
  "/trends/how-do-you-help-relocation-buyers-fall-in-love-with-the-east-bay-lifestyle",
  "/trends/what-are-buyers-valuing-more-architecture-finishes-or-location",
  "/trends/what-emotional-triggers-influence-luxury-buyer-decisions",
  "/trends/how-do-you-handle-multiple-offer-situations-on-luxury-homes-without-creating-fatigue",
  "/trends/what-do-affluent-buyers-expect-in-terms-of-discretion-and-privacy",
  "/trends/how-do-you-measure-the-success-of-a-pre-market-marketing-campaign",
  "/trends/how-is-inventory-trending-for-homes-over-2-million",
  "/trends/how-do-you-handle-seller-hesitation-about-pre-market-improvements",
  "/trends/what-defines-a-luxury-buyer-in-todays-east-bay-market",
  "/trends/what-percentage-of-your-luxury-buyers-come-from-outside-the-bay-area",
  "/trends/are-downsizers-or-upgraders-driving-more-activity-in-your-area-this-year",
  "/trends/what-local-micro-markets-are-quietly-heating-up-for-2026",
  "/trends/whats-your-process-for-pricing-strategy-in-low-inventory-high-demand-zones",
  "/trends/what-impact-is-the-tech-sector-recovery-having-on-east-bay-luxury-demand"
];

const articles = [];

for (const link of links) {
    const url = `https://www.realtor510.com${link}`;
    console.log(`Fetching ${url}...`);
    try {
        const html = execSync(`curl -sL "${url}"`).toString();
        const $ = cheerio.load(html);
        
        // Extract title (h1 or h2)
        const title = $('h1, h2').first().text().trim();
        
        // Extract the article body (often in sqs-block-html)
        let bodyHtml = '';
        let bodyText = '';
        $('.sqs-block-html .sqs-block-content').each((i, el) => {
            const pText = $(el).text().trim();
            // Don't include the title again if it's repeated
            if (pText && !pText.includes(title)) {
                bodyHtml += $(el).html() + '\n';
                bodyText += pText + '\n\n';
            }
        });

        // Some Squarespace themes use entry-content or similar
        if (!bodyText.trim()) {
           $('.entry-content, .blog-item-content').each((i, el) => {
               bodyText += $(el).text().trim() + '\n\n';
           });
        }
        
        // Meta description
        const metaDesc = $('meta[name="description"]').attr('content') || '';
        
        // Use a generic category based on title keywords or just Trends
        let category = "Insights";
        if (title.toLowerCase().includes('buyer') || title.toLowerCase().includes('seller')) category = "Buyer/Seller Dynamics";
        if (title.toLowerCase().includes('offer') || title.toLowerCase().includes('negotiate')) category = "Negotiation";
        if (title.toLowerCase().includes('pricing') || title.toLowerCase().includes('inventory')) category = "Market Intelligence";
        
        articles.push({
            id: link.replace('/trends/', ''),
            title,
            category,
            description: metaDesc || "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers.",
            content: bodyText.trim()
        });
    } catch (e) {
        console.error(`Failed to fetch ${url}`, e.message);
    }
}

fs.writeFileSync('/tmp/articles.json', JSON.stringify(articles, null, 2));
console.log(`Saved ${articles.length} articles to /tmp/articles.json`);
