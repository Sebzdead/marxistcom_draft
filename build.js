const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const distDir = path.join(__dirname, 'dist');

// 1. Clean and recreate dist directory
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Recursive copy function
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy ds, assets, and uploads
console.log('Copying static assets...');
copyRecursive(path.join(__dirname, 'ds'), path.join(distDir, 'ds'));
copyRecursive(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
copyRecursive(path.join(__dirname, 'uploads'), path.join(distDir, 'uploads'));

// 3. Compile JSX files to JS in dist
const jsxFiles = ['tweaks-panel.jsx', 'components.jsx', 'app.jsx', 'join.jsx'];
jsxFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destName = file.replace(/\.jsx$/, '.js');
  const destPath = path.join(distDir, destName);

  console.log(`Compiling ${file} to ${destName}...`);
  try {
    const result = babel.transformFileSync(srcPath, {
      presets: ['@babel/preset-react']
    });
    fs.writeFileSync(destPath, result.code);
  } catch (err) {
    console.error(`Error compiling ${file}:`, err);
    process.exit(1);
  }
});

// 4. Update HTML pages for production
const htmlFiles = ['index.html', 'join.html'];
htmlFiles.forEach(file => {
  console.log(`Processing ${file} for production...`);
  const htmlPath = path.join(__dirname, file);
  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: ${file} not found!`);
    process.exit(1);
  }
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Replace JSX script tags with compiled JS script tags
  html = html.replace(/<script type="text\/babel" src="tweaks-panel\.jsx"><\/script>/g, '<script src="tweaks-panel.js"></script>');
  html = html.replace(/<script type="text\/babel" src="components\.jsx"><\/script>/g, '<script src="components.js"></script>');
  html = html.replace(/<script type="text\/babel" src="app\.jsx"><\/script>/g, '<script src="app.js"></script>');
  html = html.replace(/<script type="text\/babel" src="join\.jsx"><\/script>/g, '<script src="join.js"></script>');

  // Remove Babel standalone script tag
  html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\s*/g, '');

  fs.writeFileSync(path.join(distDir, file), html);
});

console.log('Build completed successfully!');
