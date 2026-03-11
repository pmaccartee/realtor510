const fs = require('fs');

const htmlFiles = [
  '1015-warfield-avenue-oakland.html',
  '1297-sunnyhills-road-oakland.html',
  '261-silverado-court-oakland.html',
  '293-elysian-fields-drive-oakland.html',
  '298-elysian-fields-drive-oakland.html',
  '615-western-drive-richmond.html',
  'alameda-neighborhood-guide.html',
  'alice-waters-family-tree_(3).html',
  'alice-waters-family-tree_(4).html',
  'alice-waters-family-tree_(5).html',
  'alice-waters.html',
  'berkeley-hills-guide.html',
  'berkeley-neighborhood-guide.html',
  'crocker-highlands-guide.html',
  'crocker-highlands-trestle-glen-oakland_(1).html',
  'crocker-highlands-trestle-glen-oakland.html',
  'julia-morgan_(1).html',
  'montclair-guide.html',
  'oakland-neighborhood-guide_(1).html',
  'oakland-neighborhood-guide.html',
  'oakmore-glenview-guide.html',
  'piedmont-home-values.html',
  'piedmont-luxury-market.html',
  'piedmont-neighborhood-guide.html',
  'piedmont-vs-rockridge.html',
  'rockridge-guide.html',
  'selling-crocker-highlands-oakland.html',
  'sequoyah-hills-market-report.html',
  'temescal-guide.html',
  'trestle-glen-guide.html'
];

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core React Pages -->
  <url>
    <loc>https://realtor510.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://realtor510.com/buy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://realtor510.com/sell</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://realtor510.com/reviews</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://realtor510.com/neighborhoods</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://realtor510.com/answers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://realtor510.com/trends/waters</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://realtor510.com/trends/julia</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Content & SEO Pages -->
`;

htmlFiles.forEach(file => {
  // Determine priority based on file type
  let priority = "0.6";
  if (file.includes('guide') || file.includes('report') || file.includes('values')) {
    priority = "0.7"; // Neighborhood guides and market reports
  } else if (/\d+/.test(file) && !file.includes('510')) {
    priority = "0.5"; // Property listings
  }
  
  // Encode URL characters (specifically parenthesis)
  const encodedLoc = 'https://realtor510.com/' + file.replace(/\(/g, '%28').replace(/\)/g, '%29');

  sitemapContent += `  <url>
    <loc>${encodedLoc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync('client/public/sitemap.xml', sitemapContent);
console.log('Full sitemap generated with all HTML pages');
