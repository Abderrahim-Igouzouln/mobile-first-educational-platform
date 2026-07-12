import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const files = [
  'backend/nodejs-microservices/courses/nodejs-microservices-courses.ts',
  'mobile/flutter-advanced/courses/flutter-advanced-courses.ts',
  'mobile/flutter-intro/courses/flutter-intro-courses.ts',
  'mobile/react-native-advanced/courses/react-native-advanced-courses.ts',
];

const base = resolve('prisma/content');

for (const file of files) {
  const fp = resolve(base, file);
  let src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const mdMatch = line.match(/^(\s*)("?contentMarkdown"?:\s*)`(.*)$/s);
    
    if (mdMatch) {
      const indent = mdMatch[1];
      const prefix = mdMatch[2]; // "contentMarkdown":
      let content = mdMatch[3]; // text after opening backtick
      let j = i;
      let closed = false;

      // Look for the closing backtick (`, followed by comma on same or next line)
      // Important: triple backticks (```) are code fences, NOT closing delimiters
      
      if (j === i) {
        // Check if first line has closing backtick + comma
        // A single backtick followed by `,` is closing, but ``` is not
        const closeMatch = content.match(/`\s*,?\s*$/);
        if (closeMatch && !content.endsWith('```')) {
          content = content.slice(0, -1); // remove closing backtick
          closed = true;
        }
      }
      
      while (!closed && j < lines.length) {
        j++;
        if (j >= lines.length) break;
        const cur = lines[j];
        
        // Try to find the closing backtick on this line
        // It's at the end of content: `, or `\n
        // But NOT part of ``` code fence
        
        // Find all backtick positions
        let btPositions = [];
        for (let k = 0; k < cur.length; k++) {
          if (cur[k] === '`') btPositions.push(k);
        }
        
        // A closing backtick is a single backtick NOT part of a triple
        // If there's a backtick followed by , or whitespace-only-then-comma
        // It's the closing delimiter
        
        // Simple heuristic: the last ` on the line is the closing delimiter
        // if it's followed by optional whitespace then `,` or end-of-line
        if (btPositions.length > 0) {
          const lastBT = btPositions[btPositions.length - 1];
          const afterBT = cur.slice(lastBT + 1).trim();
          // If after the backtick there's a comma or nothing, it's the closer
          if (afterBT === '' || afterBT === ',') {
            content += '\n' + cur.slice(0, lastBT);
            closed = true;
            break;
          }
        }
        content += '\n' + cur;
      }

      // Escape ${ } inside the template literal content
      content = content.replace(/\$\{/g, '\\${');
      
      // Ensure the comma is handled
      let comma = '';
      if (j < lines.length - 1) {
        const nextLine = lines[j + 1]?.trim();
        if (nextLine?.startsWith('}') || nextLine?.startsWith(',')) {
          comma = '';
        } else {
          comma = ',';
        }
      }
      
      out.push(`${indent}${prefix}\`${content}\`${comma}`);
      i = j + 1;
    } else {
      out.push(line);
      i++;
    }
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  console.log(`Fixed: ${file}`);
}
