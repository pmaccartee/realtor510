const fs = require('fs');
const path = require('path');

const realScoutLinks = {
  'trestle-glen-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzQ2OA==',
  'crocker-highlands-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzQ2OA==',
  'montclair-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xOTMxNQ==',
  'oakmore-glenview-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xOTMxNA==',
  'piedmont-home-values': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxOA==',
  'rockridge-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNw==',
  'temescal-guide': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNw==',
  'sequoyah-hills-market-report': 'U2hhcmVhYmxlU2VhcmNoTGluay0xOTMxNg=='
};

// Copy all HTML files from attached_assets to client/public
const sourceDir = 'attached_assets';
const destDir = 'client/public';

if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    // Strip the timestamp _123456789 part
    const baseName = file.replace(/_\d+\.html$/, '.html');
    const slug = baseName.replace('.html', '');
    
    let content = fs.readFileSync(path.join(sourceDir, file), 'utf-8');
    
    // 1. Fix Nav Header to match the React app
    const cssReplacement = `/* ── Site Header ── */
  .site-header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    height: 80px;
    display: block !important;
  }
  
  .site-header-inner {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    box-sizing: border-box;
  }

  .site-nav-links {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 32px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .site-nav-links a:not(.contact-btn) {
    font-family: 'Jost', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s;
    white-space: nowrap;
  }

  .site-nav-links a:not(.contact-btn):hover {
    color: hsl(355, 75%, 35%);
  }

  .contact-btn {
    background: hsl(355, 75%, 35%);
    color: white !important;
    padding: 8px 24px;
    text-decoration: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background 0.2s;
    display: inline-block;
    white-space: nowrap;
  }

  .contact-btn:hover {
    background: hsl(355, 75%, 25%);
  }
  
  .page-hero, .hero {
    padding-top: 152px !important; /* increased padding to prevent overlap */
  }

  @media (max-width: 768px) {
    .site-nav-links { display: none !important; }
  }

  /* ── Page Hero ── */`;
  
    content = content.replace(/\/\* ── Site Header ── \*\/[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
    
    // Replace the HTML nav structure
    const htmlNavReplacement = `<nav class="site-header">
  <div class="site-header-inner">
    <a href="/" style="display: block; flex-shrink: 0;">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" style="height: 48px; width: auto; display: block;">
    </a>
    <div class="site-nav-links">
      <a href="/buy">Buy</a>
      <a href="/sell">Sell</a>
      <a href="/answers">Answers</a>
      <a href="/reviews">Reviews</a>
      <a href="/neighborhoods">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="contact-btn">Contact</a>
    </div>
  </div>
</nav>`;

    content = content.replace(/<div class="site-header">[\s\S]*?<\/div>\n*\s*<nav class="neigh-nav">[\s\S]*?<\/nav>/, htmlNavReplacement);
    // Also try standard matching if they were modified
    content = content.replace(/<nav class="site-header">[\s\S]*?<\/nav>/, htmlNavReplacement);

    // 2. Add "See Current Listings" button after the stats section or first few paragraphs
    // Looking for an appropriate place to insert the button
    const rsLink = realScoutLinks[slug];
    if (rsLink) {
      const buttonHtml = `
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://patrickmaccartee970.realscout.com/homesearch/shared-searches/${rsLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: hsl(355, 75%, 35%); color: white; padding: 16px 32px; text-decoration: none; font-family: 'Jost', sans-serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.2s;">
          See Current ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' Guide', '').replace(' Market Report', '').replace(' Home Values', '')} Listings
        </a>
      </div>
      `;
      
      // Try to insert after stat-row or arch-grid or the first paragraph
      if (!content.includes('See Current') && !content.includes(rsLink)) {
        if (content.includes('<div class="stat-row">')) {
          content = content.replace(/(<\/div>\s*<\/div>\s*<!-- End Stat Row -->|<div class="stat-row">[\s\S]*?<\/div>\s*<\/div>)/, `$1\n${buttonHtml}`);
        } else if (content.includes('<h2>')) {
          // Fallback to inserting before the first H2
          content = content.replace(/(<h2)/, `${buttonHtml}\n$1`);
        }
      }
    }

    // 3. Add GA/Meta tracking
    const gaScript = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6DDVCG0Q3F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6DDVCG0Q3F');
</script>`;
    
    const metaPixel = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1438966301114887');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1438966301114887&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;
    
    if (!content.includes('G-6DDVCG0Q3F')) {
      content = content.replace('</head>', `${gaScript}\n${metaPixel}\n</head>`);
    }

    // 4. Update image opengraph
    if (!content.includes('og:image')) {
      content = content.replace('</head>', `<meta property="og:image" content="https://realtor510.com/PM_LOGO_Red_1772927689333.png">\n</head>`);
    }

    // Save to public directory
    fs.writeFileSync(path.join(destDir, baseName), content);
    console.log(`Processed ${baseName}`);
  });
}
