const fs = require('fs');

const file = 'client/public/berkeley-hills-guide.html';
let content = fs.readFileSync(file, 'utf8');

// The berkeley link to inject
const realScoutButton = `<div style="text-align: center;">
  <a href="https://patrickmaccartee970.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNg==" target="_blank" class="react-header-btn" style="margin-top: 24px; margin-bottom: 32px; display: inline-block;">See Current Listings</a>
</div>`;

// Check if we need to insert it
if (!content.includes('See Current Listings')) {
  // Let's look for a good place to insert it, like after the first paragraph or stats block
  if (content.includes('</div>\n\n  <!-- ── Architecture Grid ── -->')) {
    content = content.replace('</div>\n\n  <!-- ── Architecture Grid ── -->', '</div>\n\n  ' + realScoutButton + '\n\n  <!-- ── Architecture Grid ── -->');
  } else if (content.includes('<div class="stat-row"')) {
    // Find the end of the stat row
    content = content.replace(/(<div class="stat-row"[\s\S]*?<\/div>\s*<\/div>)/, '$1\n  ' + realScoutButton);
  }
  
  fs.writeFileSync(file, content);
  console.log('Added RealScout link to Berkeley Hills guide');
} else {
  console.log('RealScout link already exists in Berkeley Hills guide');
}
