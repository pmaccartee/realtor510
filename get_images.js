const fs = require('fs');

async function download() {
  const images = {
    'crocker-highlands': 'https://ilonasells.com/assets/crocker-highlands-gate_1772838626967-FcVvIJqF.jpg',
    'piedmont': 'https://ilonasells.com/assets/IMG_7242_1772838368252-2NPXMwaP.jpeg',
    'temescal': 'https://ilonasells.com/assets/9871d4b6_8f71_4c1c_8e50_66698310bbdd_8a1f9e06-e055-4db1-9012-5_1772838454259-sRH_oFZq.jpg',
    'rockridge': 'https://ilonasells.com/assets/market_hall_building_small_1772838309003-BslofmMG.webp',
    'oakmore': 'https://ilonasells.com/assets/oakmore-oakland-ca-3_1772838595483-DFKzyOxX.jpg',
    'montclair': 'https://ilonasells.com/assets/IMG_7238_1772838159647-CtXIrI9J.jpeg',
    'cleveland-heights': 'https://ilonasells.com/assets/caption_1772838780188-BxrsTm5I.webp',
    'berkeley': 'https://ilonasells.com/assets/_1772838679989-QAy1jJJM.webp'
  };

  const { execSync } = require('child_process');
  
  for (const [name, url] of Object.entries(images)) {
    const ext = url.split('.').pop();
    console.log(`Downloading ${name}...`);
    try {
      execSync(`curl -s "${url}" -o "client/src/assets/images/${name}.${ext}"`);
    } catch (e) {
      console.log(`Failed to download ${name}`);
    }
  }
}
download();
