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

const files = walk('./src/calculators');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Clean up backgrounds
  content = content.replace(/bg-white\/5/g, 'bg-slate-50');
  content = content.replace(/bg-white\/10/g, 'bg-slate-100');
  content = content.replace(/bg-white\/20/g, 'bg-slate-200');
  content = content.replace(/bg-secondary/g, 'bg-slate-100');
  
  // Clean up borders
  content = content.replace(/border-white\/5/g, 'border-slate-100');
  content = content.replace(/border-white\/10/g, 'border-slate-200');
  content = content.replace(/border-white\/20/g, 'border-slate-300');
  content = content.replace(/border-white\/30/g, 'border-slate-300');
  content = content.replace(/border-transparent/g, 'border-transparent');

  // Clean up text
  content = content.replace(/text-white/g, 'text-slate-900');
  // but revert it for primary buttons
  content = content.replace(/bg-primary text-slate-900/g, 'bg-primary text-white');
  content = content.replace(/bg-success text-slate-900/g, 'bg-success text-white');
  content = content.replace(/bg-danger text-slate-900/g, 'bg-danger text-white');
  
  // Dark mode text colors that need to be darker
  content = content.replace(/text-blue-400/g, 'text-blue-600');
  content = content.replace(/text-green-400/g, 'text-green-600');
  content = content.replace(/text-yellow-400/g, 'text-yellow-600');
  content = content.replace(/text-red-400/g, 'text-red-600');

  // Special bg cases
  content = content.replace(/bg-primary-dark\/30/g, 'bg-primary/5');
  content = content.replace(/border-primary\/30/g, 'border-primary/20');
  content = content.replace(/bg-black\/40/g, 'bg-slate-50');
  content = content.replace(/bg-black\/20/g, 'bg-slate-50');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Polished UI classes in', file);
  }
});
