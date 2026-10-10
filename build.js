const fs = require('node:fs');
const path = require('node:path');

const outputDirectory = path.join(__dirname, 'dist');

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of ['index.html', 'script.js', 'style.css']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(outputDirectory, file));
}

fs.cpSync(path.join(__dirname, 'assets'), path.join(outputDirectory, 'assets'), {
  recursive: true
});