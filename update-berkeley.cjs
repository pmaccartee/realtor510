const fs = require('fs');

let code = fs.readFileSync('client/src/pages/Neighborhoods.tsx', 'utf-8');

// Update import
code = code.replace(
  /import berkeleyImg from "\.\.\/assets\/images\/berkeley\.webp";/,
  'import berkeleyImg from "../assets/images/berkeley-hills.webp";'
);

// Update name from Berkeley to Berkeley Hills
code = code.replace(
  /name: "Berkeley",(\s*)image: berkeleyImg,/,
  'name: "Berkeley Hills",$1image: berkeleyImg,'
);

fs.writeFileSync('client/src/pages/Neighborhoods.tsx', code);
console.log('Neighborhoods updated for Berkeley Hills');
