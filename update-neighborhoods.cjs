const fs = require('fs');

let code = fs.readFileSync('client/src/pages/Neighborhoods.tsx', 'utf-8');

// Add links
code = code.replace(
  /name: "Crocker Highlands",\s*image: crockerImg,\s*description: "([^"]+)"/,
  `name: "Crocker Highlands",\n    image: crockerImg,\n    description: "$1",\n    link: "https://patrickmaccartee970.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNzQ2OA=="`
);

code = code.replace(
  /name: "Temescal",\s*image: temescalImg,\s*description: "([^"]+)"/,
  `name: "Temescal",\n    image: temescalImg,\n    description: "$1",\n    link: "https://patrickmaccartee970.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNw=="`
);

code = code.replace(
  /name: "Rockridge",\s*image: rockridgeImg,\s*description: "([^"]+)"/,
  `name: "Rockridge",\n    image: rockridgeImg,\n    description: "$1",\n    link: "https://patrickmaccartee970.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNw=="`
);

code = code.replace(
  /name: "Berkeley",\s*image: berkeleyImg,\s*description: "([^"]+)"/,
  `name: "Berkeley",\n    image: berkeleyImg,\n    description: "$1",\n    link: "https://patrickmaccartee970.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNzgxNg=="`
);

// Make the cards clickable and conditionally render the button as a link
code = code.replace(
  /<div key=\{i\} className=\{\`group cursor-pointer/,
  `<div key={i} onClick={() => n.link && window.open(n.link, '_blank')} className={\`group \${n.link ? 'cursor-pointer' : ''}`
);

code = code.replace(
  /<button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary\/70 group-hover:border-primary\/70 transition-colors">\s*Explore \{n\.name\}\s*<\/button>/,
  `{n.link ? (
                      <a 
                        href={n.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest hover:text-primary/70 hover:border-primary/70 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore {n.name}
                      </a>
                    ) : (
                      <span className="inline-block text-sm font-bold border-b-2 border-transparent pb-1 text-muted-foreground uppercase tracking-widest">
                        More info coming soon
                      </span>
                    )}`
);

fs.writeFileSync('client/src/pages/Neighborhoods.tsx', code);
console.log('Neighborhoods.tsx updated');
