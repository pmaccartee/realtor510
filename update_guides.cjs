const fs = require('fs');
const path = require('path');

// Extract the new copy from the attached files for Crocker, Trestle Glen, and Berkeley Hills
const crockerSource = 'attached_assets/crocker-highlands-guide_(2)_1773252887817.html';
const trestleSource = 'attached_assets/trestle-glen-guide_(2)_1773252887788.html';
const berkeleySource = 'attached_assets/berkeley-hills-guide_(2)_1773252917058.html';

const crockerTarget = 'client/public/crocker-highlands-guide.html';
const trestleTarget = 'client/public/trestle-glen-guide.html';
const berkeleyTarget = 'client/public/berkeley-hills-guide.html';

// Extract the main content wrapper (page-hero and page-wrap) and SEO metadata
function extractContentAndSeo(sourcePath) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Extract Title and Meta tags
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  const keywordsMatch = content.match(/<meta name="keywords" content="(.*?)">/);
  const ogTitleMatch = content.match(/<meta property="og:title" content="(.*?)">/);
  const ogDescMatch = content.match(/<meta property="og:description" content="(.*?)">/);
  const schemaMatch = content.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/);
  
  // Extract main content
  const heroMatch = content.match(/<header class="page-hero">[\s\S]*?<\/header>/);
  const wrapMatch = content.match(/<main class="page-wrap">[\s\S]*?<\/main>/);
  
  // If we couldn't find header/main tags, look for div versions
  const heroContent = heroMatch ? heroMatch[0] : (content.match(/<div class="page-hero">[\s\S]*?<\/div>\s*<div class="page-wrap">/) ? content.match(/<div class="page-hero">[\s\S]*?<\/div>/)[0] : null);
  
  const wrapContent = wrapMatch ? wrapMatch[0] : (content.match(/<div class="page-wrap">[\s\S]*?<!-- ── CTA Block ── -->[\s\S]*?<\/div>\s*<\/div>/) ? content.match(/<div class="page-wrap">[\s\S]*?<!-- ── CTA Block ── -->[\s\S]*?<\/div>\s*<\/div>/)[0] : content.match(/<div class="page-wrap">[\s\S]*?(?=<footer|<\/body>)/)[0]);
  
  return {
    title: titleMatch ? titleMatch[1] : '',
    desc: descMatch ? descMatch[1] : '',
    keywords: keywordsMatch ? keywordsMatch[1] : '',
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : '',
    ogDesc: ogDescMatch ? ogDescMatch[1] : '',
    schema: schemaMatch ? schemaMatch[0] : '',
    hero: heroContent,
    wrap: wrapContent
  };
}

// Ensure the realscout button gets properly injected if missing
const realScoutLinks = {
  'crocker': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzQ2OA==',
  'trestle': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzQ2OA==',
  'berkeley': 'U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxOA==' // Placeholder, we might need a specific one
};

function updateTargetFile(targetPath, sourceData, key) {
  let targetContent = fs.readFileSync(targetPath, 'utf8');
  
  // Update Title
  if (sourceData.title) {
    targetContent = targetContent.replace(/<title>.*?<\/title>/, `<title>${sourceData.title}</title>`);
  }
  
  // Update Meta
  if (sourceData.desc) {
    targetContent = targetContent.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${sourceData.desc}">`);
  }
  if (sourceData.keywords) {
    targetContent = targetContent.replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${sourceData.keywords}">`);
  }
  if (sourceData.ogTitle) {
    targetContent = targetContent.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${sourceData.ogTitle}">`);
  }
  
  // Update schemas
  if (sourceData.schema) {
    targetContent = targetContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, sourceData.schema);
  }
  
  // Update main content blocks
  if (sourceData.hero && sourceData.wrap) {
    // We need to replace everything between the header/nav and the footer
    
    // First, find what's currently there to replace
    const currentHeroMatch = targetContent.match(/<header class="page-hero">[\s\S]*?<\/header>/) || targetContent.match(/<div class="page-hero">[\s\S]*?<\/div>/);
    
    if (currentHeroMatch) {
      targetContent = targetContent.replace(currentHeroMatch[0], sourceData.hero);
    }
    
    const currentWrapMatch = targetContent.match(/<main class="page-wrap">[\s\S]*?<\/main>/) || targetContent.match(/<div class="page-wrap">[\s\S]*?<!-- ── CTA Block ── -->[\s\S]*?<\/div>\s*<\/div>/) || targetContent.match(/<div class="page-wrap">[\s\S]*?(?=<footer|<nav class="footer-links">)/);
    
    if (currentWrapMatch) {
      // Clean up RealScout button if needed
      let finalWrap = sourceData.wrap;
      
      // Look for the View Current Listings placeholder and replace with RealScout button
      const realScoutButton = `<a href="javascript:void(0)" onclick="window.open('https://realtor510.realscout.com/homesearch/map?hide_criteria=true&property_status=1-122&hba_m_id=${realScoutLinks[key]}', 'realscout', 'width=1000,height=800,scrollbars=yes'); return false;" class="react-header-btn" style="margin-top: 24px; margin-bottom: 32px; display: inline-block;">See Current Listings</a>`;
      
      if (!finalWrap.includes('See Current Listings')) {
        // Insert after the stat-row or first paragraph
        if (finalWrap.includes('</div>\n\n  <!-- ── Architecture Grid ── -->')) {
          finalWrap = finalWrap.replace('</div>\n\n  <!-- ── Architecture Grid ── -->', '</div>\n\n  <div style="text-align: center;">\n    ' + realScoutButton + '\n  </div>\n\n  <!-- ── Architecture Grid ── -->');
        } else if (finalWrap.includes('<div class="stat-row">')) {
           finalWrap = finalWrap.replace(/<div class="stat-row">[\s\S]*?<\/div>\s*<\/div>/, '$&\n  <div style="text-align: center;">\n    ' + realScoutButton + '\n  </div>');
        }
      }
      
      targetContent = targetContent.replace(currentWrapMatch[0], finalWrap);
    }
  }
  
  // Make sure we have the correct phone number obfuscation in the footer CTA
  targetContent = targetContent.replace(/href="tel:[^"]*"/g, `href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')"`);
  
  fs.writeFileSync(targetPath, targetContent);
  console.log(`Updated ${targetPath}`);
}

// 1. Process Crocker Highlands
const crockerData = extractContentAndSeo(crockerSource);
updateTargetFile(crockerTarget, crockerData, 'crocker');

// 2. Process Trestle Glen
const trestleData = extractContentAndSeo(trestleSource);
updateTargetFile(trestleTarget, trestleData, 'trestle');

// 3. Create Berkeley Hills based on Crocker template
const berkeleyData = extractContentAndSeo(berkeleySource);
const crockerTemplate = fs.readFileSync(crockerTarget, 'utf8');

// Use updateTargetFile logic but with a completely new file
fs.writeFileSync(berkeleyTarget, crockerTemplate);
updateTargetFile(berkeleyTarget, berkeleyData, 'berkeley');

// Add Berkeley Hills to navigation
const allFiles = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html',
  'client/public/berkeley-hills-guide.html'
];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add Berkeley Hills to neigh-nav if not present
  if (!content.includes('berkeley-hills-guide.html') && content.includes('<nav class="neigh-nav">')) {
    const navInsert = '      <a href="montclair-guide.html">Montclair</a>\n      <a href="berkeley-hills-guide.html">Berkeley Hills</a>';
    content = content.replace(/<a href="montclair-guide\.html">Montclair<\/a>/, navInsert);
    
    // Update active state if we are on Berkeley Hills
    if (file === 'client/public/berkeley-hills-guide.html') {
      content = content.replace(/<a href="[^"]*" class="n-active">[^<]*<\/a>/, match => {
        return match.replace('class="n-active"', '');
      });
      content = content.replace(/<a href="berkeley-hills-guide\.html">Berkeley Hills<\/a>/, '<a href="berkeley-hills-guide.html" class="n-active">Berkeley Hills</a>');
    }
    
    fs.writeFileSync(file, content);
  }
});
