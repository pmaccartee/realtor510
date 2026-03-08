const http = require('http');

http.get('http://localhost:5000/waters', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Should be an HTML page containing "The House That Alice Built" if it's the SPA serving it
    if (data.includes('The House That Alice Built') || data.includes('Alice Waters')) {
      console.log('Found it via SPA');
    } else {
      console.log('Not found via SPA. Data length:', data.length);
      console.log('Start of data:', data.substring(0, 100));
    }
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
