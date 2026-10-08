const fs = require('fs');
const path = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\68e01dd2-23d1-4113-8fe7-9ae13c867d0e\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (const line of lines) {
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    // check if it's the view_file tool output
    if (data.type === 'TOOL_CALL_RESPONSE' && data.content && data.content.includes('Game Mengenal Kalor, IPA Kelas 7.html')) {
      if (data.content.includes('<!DOCTYPE html>')) {
        console.log(data.content);
        break;
      }
    }
  } catch(e) {}
}
