const fs = require('fs');
const path = require('path');

const crispId = process.env.CRISP_WEBSITE_ID;
if (!crispId) {
  console.warn(
    'CRISP_WEBSITE_ID environment variable is not set. Skipping Crisp chat injection.'
  );
  process.exit(0);
}

const distFile = path.join(__dirname, 'dist', 'chatbot.js');
let content = fs.readFileSync(distFile, 'utf8');
content = content.replace(/{{CRISP_WEBSITE_ID}}/g, crispId);
fs.writeFileSync(distFile, content);

console.log(`Injected CRISP_WEBSITE_ID into ${distFile}`);
