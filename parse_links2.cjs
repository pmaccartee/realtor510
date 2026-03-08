const fs = require('fs');
const { execSync } = require('child_process');

let allLinks = new Set();

// Let's fetch the trends page and look for the pagination format.
// Usually in Squarespace it's /trends?offset=timestamp
try {
   const html = execSync('curl -sL "https://www.realtor510.com/trends"').toString();
   const links = html.match(/\/trends\/[a-zA-Z0-9-]+/g) || [];
   links.forEach(l => {
       if (l !== '/trends/waters') allLinks.add(l);
   });
   
   // Find the next page link if it exists
   // Squarespace next page often looks like ?offset=XXXXX
   const offsetMatch = html.match(/"\?offset=([^"]+)"/);
   
   if (offsetMatch) {
       console.log("Found pagination offset:", offsetMatch[1]);
       const nextUrl = `https://www.realtor510.com/trends?offset=${offsetMatch[1]}`;
       console.log("Fetching next page:", nextUrl);
       const html2 = execSync(`curl -sL "${nextUrl}"`).toString();
       const links2 = html2.match(/\/trends\/[a-zA-Z0-9-]+/g) || [];
       links2.forEach(l => {
           if (l !== '/trends/waters') allLinks.add(l);
       });
   } else {
       // Let's also check for older items link which might look like /trends?offset=... inside href
       const olderMatch = html.match(/href="(\/trends\?offset=[^"]+)"/);
       if (olderMatch) {
           console.log("Found pagination link:", olderMatch[1]);
           const nextUrl = `https://www.realtor510.com${olderMatch[1]}`;
           console.log("Fetching next page:", nextUrl);
           const html2 = execSync(`curl -sL "${nextUrl}"`).toString();
           const links2 = html2.match(/\/trends\/[a-zA-Z0-9-]+/g) || [];
           links2.forEach(l => {
               if (l !== '/trends/waters') allLinks.add(l);
           });
       }
   }
} catch (e) {
    console.log("Error:", e.message);
}

const finalLinks = Array.from(allLinks);
console.log(`Found ${finalLinks.length} total unique links.`);
fs.writeFileSync('/tmp/all_links.json', JSON.stringify(finalLinks, null, 2));

