import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const fp = resolve('prisma/content/frontend/vuejs-advanced/courses/vuejs-advanced-courses.ts');
let src = readFileSync(fp, 'utf-8');

// Revert my bad backtick replacement: change ` back to " for contentMarkdown openings
src = src.replace(/"contentMarkdown": `/g, '"contentMarkdown": "');

// Now also need to fix the backtick-as-quote-inside issue.
// The merged line (now at the old line 18 position) has the contentMarkdown 
// ending with: ...navigation" on the same line as the preceding content.
// That closing " should be followed by , (comma) and then newline.

// Let me just verify the state of the file
const lines = src.split('\n');
console.log('Line count:', lines.length);
// Find contentMarkdown lines and check their structure
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"contentMarkdown"')) {
    const line = lines[i];
    const startsWithQuote = line.includes('"contentMarkdown": "');
    const endsWithQuoteComma = line.trimEnd().endsWith('",');
    console.log(`Line ${i+1}: starts with quote: ${startsWithQuote}, ends with quote+comma: ${endsWithQuoteComma}, len: ${line.length}`);
    if (!endsWithQuoteComma) {
      console.log(`  Last 30 chars: '${line.slice(-30)}'`);
    }
  }
}

writeFileSync(fp, src, 'utf-8');
console.log('Done fixing');
