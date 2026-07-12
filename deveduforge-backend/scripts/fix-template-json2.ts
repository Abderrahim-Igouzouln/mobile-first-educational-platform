import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';

const files = [
  'backend/python-backend/courses/python-backend-courses.ts',
  'backend/python-data-science/courses/python-data-science-courses.ts',
  'devops-cloud/aws-cloud-practitioner/courses/aws-cloud-practitioner-courses.ts',
  'devops-cloud/aws-solutions-architect/courses/aws-solutions-architect-courses.ts',
  'devops-cloud/docker-production/courses/docker-production-courses.ts',
];

const base = resolve('prisma/content');

function findClosingBacktick(lines: string[], startLine: number): { endLine: number; content: string } {
  let content = '';
  let j = startLine;
  let closed = false;
  
  // First line already has the opening backtick removed (by the caller)
  // The pattern is: contentMarkdown: `CONTENT_PARTS`
  // We need to find the closing ` that ends the template literal
  
  // Strategy: track backtick state across lines
  // A closing backtick is NOT part of a tripple backtick (code fence)
  // We use a simple heuristic: if a line ends with `, (backtick + comma) or just `,
  // and the backtick is not part of ```, it's the closing
  
  while (j < lines.length) {
    const line = j === startLine ? '' : lines[j]; // first line's content already extracted
    
    // Find all backtick positions in the line
    let pos = -1;
    let lineContent = line;
    
    while (!closed) {
      pos = lineContent.indexOf('`');
      if (pos === -1) {
        // No backtick on this line, all content
        content += (j > startLine ? '\n' : '') + lineContent;
        break;
      }
      
      // Found a backtick - check if it's part of a triple
      const before = lineContent.slice(0, pos);
      
      // Check if this is a triple backtick (```)
      if (pos + 2 < lineContent.length && lineContent[pos + 1] === '`' && lineContent[pos + 2] === '`') {
        // This is a code fence opener/closer - skip all 3 backticks
        content += (j > startLine ? '\n' : '') + before;
        // We need to include the backticks as content (they'll be JSON-escaped)
        content += '```';
        lineContent = lineContent.slice(pos + 3);
        continue;
      }
      
      // Single backtick - is this the closing delimiter?
      const after = lineContent.slice(pos + 1);
      const trimmedAfter = after.trim();
      
      // Check if the line ends with this backtick (or backtick + comma)
      if (trimmedAfter === '' || trimmedAfter === ',') {
        content += (j > startLine ? '\n' : '') + before;
        closed = true;
        break;
      }
      
      // Backtick in the middle of content (like inline code `code`)
      // Include it as-is
      content += (j > startLine ? '\n' : '') + before + '`';
      lineContent = after;
      // Continue searching for more backticks on this line
    }
    
    if (closed) break;
    j++;
  }
  
  return { endLine: j, content };
}

for (const file of files) {
  const fp = resolve(base, file);
  let src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    // Match: contentMarkdown: followed by backtick
    const openMatch = line.match(/^(\s*)("?contentMarkdown"?:\s*)`(.+)?$/s);
    
    if (openMatch) {
      const indent = openMatch[1];
      const prefix = openMatch[2];
      let firstContent = openMatch[3] || '';
      
      let content: string;
      let endLine: number;
      
      // Check if the opening line ALSO contains the closing backtick
      // (single backtick not part of triple)
      if (firstContent.includes('`')) {
        // Parse the first line for closing backtick
        const result = findClosingBacktick([firstContent], 0);
        if (result.endLine === 0) {
          // Closed on the same line! 
          content = result.content;
          endLine = i;
        } else {
          // Not closed, continue scanning
          content = firstContent;
          const restResult = findClosingBacktick(lines, i + 1);
          content += '\n' + restResult.content;
          endLine = restResult.endLine;
        }
      } else {
        content = firstContent;
        const restResult = findClosingBacktick(lines, i + 1);
        if (restResult.endLine > i) {
          content += '\n' + restResult.content;
        }
        endLine = restResult.endLine;
      }
      
      const escaped = JSON.stringify(content);
      out.push(`${indent}${prefix}${escaped},`);
      i = endLine + 1;
    } else {
      out.push(line);
      i++;
    }
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  console.log(`Fixed: ${file} (${lines.length} -> ${out.length} lines)`);
}
