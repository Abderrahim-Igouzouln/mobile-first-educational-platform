import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const files = [
  'backend/python-backend/courses/python-backend-courses.ts',
  'backend/python-data-science/courses/python-data-science-courses.ts',
  'devops-cloud/aws-cloud-practitioner/courses/aws-cloud-practitioner-courses.ts',
  'devops-cloud/aws-solutions-architect/courses/aws-solutions-architect-courses.ts',
  'devops-cloud/docker-production/courses/docker-production-courses.ts',
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
    
    // Match: contentMarkdown: followed by backtick
    const openMatch = line.match(/^(\s*)("?contentMarkdown"?:\s*)`(.*)$/);
    
    if (openMatch) {
      const indent = openMatch[1];
      const prefix = openMatch[2]; // including trailing space
      let content = openMatch[3]; // text after opening backtick
      let j = i;

      // Find the closing backtick (the template literal backtick)
      // It's before `,` or `\n` followed by `  },` or `  },`
      let closed = false;
      
      // Check if this line already has the closing backtick
      // The closing backtick is: ` followed by optional whitespace then `,` or end-of-line
      // BUT it must not be part of a triple-backtick code fence
      // A triple-backtick starts with ``` or ends with ```
      // A closing template literal backtick is a SINGLE backtick
      
      // Check current line for closing backtick
      if (content.includes('`')) {
        // Try to find the closing backtick
        // Look for backtick followed by `,` then possibly whitespace
        const closeMatch = content.match(/`(\s*,?\s*)$/);
        if (closeMatch && !content.endsWith('```')) {
          // Single backtick at end (not triple) - this is the closer
          // But verify it's not part of a code fence like ```code`
          // If line ends with ``, it's probably a code fence
          content = content.replace(/`(\s*,?\s*)$/, '');
          closed = true;
        }
      }
      
      while (!closed && j < lines.length - 1) {
        j++;
        const cur = lines[j];
        
        // Find backtick that closes the template literal
        // It's the LAST backtick on the line, because template literal closes
        // at the end before `,` or `    },`
        const btPositions = [];
        for (let k = 0; k < cur.length; k++) {
          if (cur[k] === '`') btPositions.push(k);
        }
        
        if (btPositions.length > 0) {
          // Check the last backtick position
          const lastBT = btPositions[btPositions.length - 1];
          const beforeBT = cur.slice(0, lastBT);
          const afterBT = cur.slice(lastBT + 1).trim();
          
          // If after the backtick there's a comma or nothing, this is likely the closing backtick
          // But make sure it's not part of ``` (if the last 3 chars before it are ```, the backtick at position lastBT closes a code fence)
          const lastThree = cur.slice(Math.max(0, lastBT - 2), lastBT + 1);
          
          // If the backtick is NOT preceded by 2 other backticks (i.e., it's not part of ```)
          // AND it's followed by `,` or end-of-line, it's the template literal closer
          if (lastThree !== '```' && (afterBT === '' || afterBT === ',')) {
            content += '\n' + beforeBT;
            closed = true;
            break;
          }
        }
        content += '\n' + cur;
      }

      // Now content is the full template literal content
      // Convert to JSON string: replace actual newlines with \n and wrap in quotes
      const escaped = JSON.stringify(content);
      out.push(`${indent}${prefix}${escaped},`);
      i = j;
    } else {
      out.push(line);
    }
    i++;
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  const newLines = out.length;
  console.log(`Fixed: ${file} (${newLines} lines)`);
}
