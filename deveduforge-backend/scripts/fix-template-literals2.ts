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
  let result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    // Check if this line starts a contentMarkdown template literal
    const mdMatch = line.match(/^(\s*)"?contentMarkdown"?:\s*`(.*)$/);
    if (mdMatch) {
      let indent = mdMatch[1];
      let content = mdMatch[2]; // content after the opening backtick
      let j = i;
      
      // Find the closing backtick (either on this line or subsequent lines)
      while (j < lines.length) {
        if (j === i) {
          // Already have content from this line (after backtick)
          // Check if it ends with backtick
          if (content.endsWith('`')) {
            content = content.slice(0, -1); // remove closing backtick
            break;
          }
        } else {
          // Read new line
          if (lines[j].endsWith('`')) {
            content += '\n' + lines[j].slice(0, -1); // remove closing backtick
            break;
          } else {
            content += '\n' + lines[j];
          }
        }
        j++;
      }
      
      // Escape any ${ } expressions
      content = content.replace(/\$\{/g, '\\${');
      
      // Convert to JSON-style single-line string
      const escaped = JSON.stringify(content);
      result.push(`${indent}"contentMarkdown": ${escaped}`);
      if (j > i) {
        // Skip consumed lines
        i = j;
      }
    } else {
      result.push(line);
    }
    i++;
  }

  writeFileSync(fp, result.join('\n'), 'utf-8');
  console.log(`Fixed: ${file}`);
}
