import { readFileSync, writeFileSync, statSync } from 'fs';
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

    // Look for a broken contentMarkdown JSON string that ends the line
    // with a double-quote (meaning my first fix cut it short)
    // Pattern: "contentMarkdown": "..." and the content after " is not 
    // followed by , (it was cut by the premature closing)
    
    const brokenMatch = line.match(/^(\s*)("?contentMarkdown"?:\s*"[^"]*")\s*$/);
    
    if (brokenMatch) {
      const indent = brokenMatch[1];
      const prefix = 'contentMarkdown';
      const currentContent = line; // whole line
      
      // Collect all orphaned lines until we find the lesson end (}, )
      let orphanedContent = '';
      let j = i + 1;
      let foundEnd = false;
      
      while (j < lines.length) {
        const l = lines[j].trim();
        if (l === '},' || l === '},') {
          foundEnd = true;
          break;
        }
        // Collect the orphaned content
        if (orphanedContent) orphanedContent += '\n';
        orphanedContent += lines[j];
        j++;
      }
      
      if (foundEnd) {
        // Reconstruct the contentMarkdown value as a backtick template literal
        // The original content is everything after the opening " up to the
        // first broken " plus the orphaned content
        
        // Extract the partial content from the current broken string
        const existingContent = currentContent.match(/"contentMarkdown":\s*"(.*)/)?.[1] || '';
        
        // Rebuild the full content
        const fullContent = existingContent + '\n' + orphanedContent;
        
        // Escape ${ } expressions
        const escaped = fullContent.replace(/\$\{/g, '\\${');
        
        out.push(`${indent}"${prefix}": \`${escaped}\`,`);
        i = j; // skip to the lesson end
      } else {
        out.push(line);
        i++;
      }
    } else {
      out.push(line);
      i++;
    }
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  const size = statSync(fp).size;
  console.log(`Fixed: ${file} (${out.length} lines, ${size} bytes)`);
}
