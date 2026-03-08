const fs = require('fs');

// We have an issue where /waters is giving a 404. Let's fix the server configuration to use a proper catchall for the SPA

const indexCode = fs.readFileSync('server/index.ts', 'utf8');
const staticCode = fs.readFileSync('server/static.ts', 'utf8');
console.log(staticCode);

