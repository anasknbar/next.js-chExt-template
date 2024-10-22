const fs = require('fs');
const glob = require('glob');

// Find all HTML files in the 'out' directory
const files = glob.sync('out/**/*.html');

// Replace _next with next, and correct the '../' paths in the HTML files
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace '/_next' with './next' for Chrome extension compatibility
  content = content.replace(/\/_next/g, './next');
  
  // Correct any '../next' paths to './next'
  content = content.replace(/\/\.\.\/next/g, './next');
  
  // Write the modified content back to the file
  fs.writeFileSync(file, content, 'utf-8');
});


const jsAndCssFiles = glob.sync('out/**/*.{js,css}');

jsAndCssFiles.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace '/_next' with './next' for Chrome extension compatibility
  content = content.replace(/\/_next/g, './next');
  
  // Write the modified content back to the file
  fs.writeFileSync(file, content, 'utf-8');
});


// Rename the _next folder to next for compatibility with Chrome Extensions
const sourcePath = 'out/_next';
const destinationPath = 'out/next';

fs.rename(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error('Failed to rename "_next" directory to "next".', err);
  } else {
    console.log('Renamed "_next" directory to "next" successfully.');
  }
});


// --------------

const path = require('path');

// Define the path to the index.html file
const file = 'out/index.html';

// Create a directory for external scripts if it doesn't exist
const scriptsDir = 'out/external-scripts';
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir);
}

// Read the index.html content
let content = fs.readFileSync(file, 'utf-8');

// Regex to find <script>...</script> blocks
const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let scriptCount = 0;

// Replace inline scripts with external script references
content = content.replace(scriptRegex, (match, scriptContent) => {
  const scriptFileName = `inline-script-${scriptCount}.js`;
  const scriptFilePath = path.join(scriptsDir, scriptFileName);

  // Write the extracted script content to a new file
  fs.writeFileSync(scriptFilePath, scriptContent, 'utf-8');

  // Replace inline script with a reference to the external script
  scriptCount++;
  return `<script src="./external-scripts/${scriptFileName}"></script>`;
});
fs.writeFileSync(file, content, 'utf-8');


// // --------
// // const fs = require('fs');
// // const glob = require('glob');

// // Find all HTML files in the 'out' directory
// // const files = glob.sync('out/**/*.html');

// // Replace _next paths but leave __next variables intact
// files.forEach((file) => {
//   let content = fs.readFileSync(file, 'utf-8');

//   // Replace all occurrences of the /_next path with /next
//   const modifiedContent = content.replace(/\/_next/g, './next');

//   fs.writeFileSync(file, modifiedContent, 'utf-8');
// });

// // // Rename the _next directory to next
// // const sourcePath = 'out/_next';
// // const destinationPath = 'out/next';

// // fs.rename(sourcePath, destinationPath, (err) => {
// //   if (err) {
// //     console.error('Failed to rename "_next" directory to "next".', err);
// //   } else {
// //     console.log('Renamed "_next" directory to "next" successfully.');
// //   }
// // });















