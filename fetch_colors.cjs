const https = require('https');
https.get('https://calcpro.net/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract inline styles or link to CSS
    const styles = data.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
    console.log("STYLES:", styles.map(s => s.substring(0, 200)));
    const links = data.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || [];
    console.log("LINKS:", links);
    // Find some colors
    const colors = data.match(/#[0-9a-fA-F]{3,6}/g) || [];
    console.log("COLORS:", [...new Set(colors)].slice(0, 10));
  });
});
