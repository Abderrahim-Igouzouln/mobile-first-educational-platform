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

// Find the closing bare backtick of a template literal starting from the opening backtick on startLine.
// Returns the content between the delimiters (with escaped sequences decoded).
function extractTemplateContent(lines: string[], startLine: number): { endLine: number; content: string } {
  const firstLine = lines[startLine];
  const backtickIdx = firstLine.indexOf('`'); // opening backtick position
  const afterOpen = firstLine.slice(backtickIdx + 1); // text after opening backtick
  
  let parts: string[] = [];
  
  // Helper: find the first bare (unescaped) backtick in a string
  // Returns index or -1
  function findBareBacktick(s: string): number {
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '`' && (i === 0 || s[i-1] !== '\\')) return i;
    }
    return -1;
  }
  
  // Check if the closing backtick is on the first line
  let rest = afterOpen;
  while (true) {
    const idx = findBareBacktick(rest);
    if (idx === -1) {
      parts.push(rest);
      break; // no closing backtick on this line
    }
    // Found a bare backtick - is this the closing delimiter?
    const afterBT = rest.slice(idx + 1).trim();
    if (afterBT === '' || afterBT === ',') {
      // This is the closing backtick
      parts.push(rest.slice(0, idx));
      return { endLine: startLine, content: parts.join('\n') };
    }
    // It's an inline code backtick (part of markdown content that wasn't escaped)
    // Keep it as content and continue
    parts.push(rest.slice(0, idx + 1));
    rest = rest.slice(idx + 1);
  }
  
  // Closing backtick not on first line; scan subsequent lines
  let j = startLine + 1;
  while (j < lines.length) {
    const line = lines[j];
    const trimmed = line.trim();
    
    // Check if this line is JUST the closing backtick (possibly with comma)
    if (trimmed === '`' || trimmed === '`,' || trimmed === '`)' || trimmed === '`),') {
      // Closing backtick found on this line by itself
      return { endLine: j, content: parts.join('\n') };
    }
    
    // Search for a bare closing backtick
    rest = line;
    while (true) {
      const idx = findBareBacktick(rest);
      if (idx === -1) {
        parts.push(rest);
        break;
      }
      // Found a bare backtick - potential closing delimiter
      const afterBT = rest.slice(idx + 1).trim();
      // It's the closing delimiter if the backtick is at the end of the line
      // (followed by nothing, comma, or `},`)
      if (afterBT === '' || afterBT === ',' || afterBT.startsWith(',')) {
        parts.push(rest.slice(0, idx));
        return { endLine: j, content: parts.join('\n') };
      }
      // It's an inline backtick in markdown content
      parts.push(rest.slice(0, idx + 1));
      rest = rest.slice(idx + 1);
    }
    
    j++;
  }
  
  return { endLine: j, content: parts.join('\n') };
}

for (const file of files) {
  const fp = resolve(base, file);
  let src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    // Match: contentMarkdown: followed by backtick (opening a template literal)
    const openMatch = line.match(/^(\s*)("?contentMarkdown"?:\s*)`/);
    
    if (openMatch) {
      const indent = openMatch[1];
      const prefix = openMatch[2];
      
      const { endLine, content } = extractTemplateContent(lines, i);
      
      // Unescape template literal escape sequences to get the real string value:
      // `\\` -> `\`  (escaped backslash)
      // `\`` -> `` ` ``  (escaped backtick)
      const realContent = content
        .replace(/\\\\/g, '\\')
        .replace(/\\`/g, '`');
      
      const escaped = JSON.stringify(realContent);
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
