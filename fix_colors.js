import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace hardcoded purples with new blue (36, 93, 162)
  content = content.replace(/rgba\(124,58,237/g, 'rgba(36,93,162');
  content = content.replace(/rgba\(124, 58, 237/g, 'rgba(36, 93, 162');
  content = content.replace(/#7c3aed/gi, '#245da2');
  content = content.replace(/#a78bfa/gi, '#3b74bb');

  // Replace hardcoded white texts/bgs that are clearly meant for dark mode
  if (file.includes('Home.jsx')) {
    content = content.replace(/rgba\(255,255,255,0\.025\)/g, 'rgba(0,0,0,0.025)');
    content = content.replace(/rgba\(255,255,255,0\.04\)/g, 'rgba(0,0,0,0.04)');
    content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'rgba(0,0,0,0.1)');
    content = content.replace(/rgba\(255,255,255,0\.03\)/g, 'rgba(0,0,0,0.03)');
    content = content.replace(/rgba\(255,255,255,0\.08\)/g, 'rgba(0,0,0,0.08)');
    content = content.replace(/color: 'white'/g, "color: 'var(--text-main)'");
    content = content.replace(/color: 'var\(--text-faint\)'/g, "color: 'var(--text-secondary)'");
  }

  if (file.includes('AboutUs.jsx')) {
    content = content.replace(/color: 'white'/g, "color: 'var(--text-main)'");
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
