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

// Find the closing backtick of a template literal in accumulated text.
// The `text` contains the content after the opening backtick, with `\n` between lines.
// The closing backtick is a bare backtick (not preceded by `\`) that:
//   - Is at the end of a line (followed by `\n`) OR followed by `,\n`
//   - AND the NEXT line (after the backtick + optional `,`) has `},`
function findClosingBacktick(text: string, startIdx: number): number {
  let i = startIdx;
  
  while (i < text.length) {
    // Handle escaped sequences: skip \` and \\
    if (text[i] === '\\' && i + 1 < text.length) {
      if (text[i + 1] === '`' || text[i + 1] === '\\' || text[i + 1] === 'n' || text[i + 1] === 't' || text[i + 1] === 'r' || text[i + 1] === '"') {
        i += 2; // skip all valid escapes
        continue;
      }
    }
    
    if (text[i] === '`') {
      // Found a bare backtick - check if it's the closing delimiter.
      // The closing backtick pattern: at least one of:
      //   a) `,\n    },`  (backtick + comma + newline + whitespace + `},`)
      //   b) `\n    },`   (backtick + newline + whitespace + `},`)
      // The \n and }, must be on the NEXT line, not just after whitespace
      
      const after = text.slice(i + 1);
      
      // Quick check: skip whitespace
      let afterTrim = after;
      while (afterTrim.length > 0 && (afterTrim[0] === ' ' || afterTrim[0] === '\t')) {
        afterTrim = afterTrim.slice(1);
      }
      
      // After optional whitespace, expect `,` or `\n` or `}\n`
      if (afterTrim.startsWith(',') || afterTrim.startsWith('\n') || afterTrim.startsWith('}\n') || afterTrim.startsWith('},\n')) {
        // Find the end of this line (the `,` or end of current accumulation)
        // Then find `},` or `}` on the next line
        
        // Look for the pattern: `,` + newline + whitespace + `}`
        // Starting from idx i+1:
        let scanIdx = i + 1;
        
        // Skip comma and whitespace on this line
        while (scanIdx < text.length && text[scanIdx] !== '\n') scanIdx++;
        
        // Now at `\n` - skip it
        if (scanIdx < text.length) scanIdx++;
        
        // Skip whitespace on the next line
        while (scanIdx < text.length && (text[scanIdx] === ' ' || text[scanIdx] === '\t')) scanIdx++;
        
        // Check if the next line starts with `},`
        if (scanIdx < text.length && text[scanIdx] === '}') {
          // Found `},` pattern - this is the closing backtick
          return i;
        }
      }
      
      // Not a closing delimiter - it's an inline code backtick in the content
      i++;
    } else {
      i++;
    }
  }
  
  return -1;
}

for (const file of files) {
  const fp = resolve(base, file);
  const src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;
  let fixed = 0;

  while (i < lines.length) {
    const line = lines[i];
    const cmIdx = line.indexOf('contentMarkdown:');
    
    if (cmIdx !== -1) {
      const afterColon = line.slice(cmIdx + 'contentMarkdown:'.length).trimStart();
      
      // Check if template literal (starts with ` or preceded by \` in a template literal)
      if (afterColon.startsWith('`') || afterColon.startsWith('\\`')) {
        const indent = line.slice(0, cmIdx);
        const prefix = line.slice(cmIdx, cmIdx + 'contentMarkdown:'.length) + ' ';
        
        // Reconstruct all content lines starting from after the opening backtick
        const templateStart = line.indexOf('`') + 1;
        let fullContentLines = [line.slice(templateStart)];
        
        // Read ALL subsequent lines until we hit `},` (lesson closer)
        // accumulating them to extract the template literal content
        let lessonEndIdx = -1;
        let lineIdx = i + 1;
        
        while (lineIdx < lines.length) {
          const cl = lines[lineIdx];
          const trimmedLine = cl.trim();
          
          // Stop when we hit the lesson closer: `},`
          if (trimmedLine === '},' && lineIdx > i + 1) {
            lessonEndIdx = lineIdx;
            break;
          }
          
          fullContentLines.push(cl);
          lineIdx++;
        }
        
        if (lessonEndIdx === -1) {
          out.push(line);
          i++;
          continue;
        }
        
        // Full accumulated text (with \n separators)
        const accumulatedText = fullContentLines.join('\n');
        
        // Find the LAST bare backtick that closes the template literal.
        // The template literal ends with: a bare backtick followed by `,` and then the lesson closer `},`
        // Strategy: find the last bare backtick in accumulatedText that is followed by `,\n` and then `},`
        let closingIdx = -1;
        
        // Scan backwards to find the closing backtick
        let scanPos = accumulatedText.length - 1;
        
        // First, find `},` going backwards from the end
        // The text ends with something like: \n\`\`\`\n`,\n    }},
        // Wait, the fullContentLines DON'T include the `},` line. So the accumulator ends at:
        // the line BEFORE `},`
        
        // Actually, the closing backtick is the LAST bare backtick in accumulatedText.
        // We can find it by:
        // 1. Find all bare backtick positions (not preceded by \)
        // 2. The LAST one is the closing backtick
        
        // But we need to validate: is the last bare backtick followed by `,\n    },`?
        // Since the accumulatedText doesn't include the `},` line, we check differently.
        // Often the closing backtick is on its own line: `` ` ``
        
        // Find last bare backtick
        for (let pos = accumulatedText.length - 1; pos >= 0; pos--) {
          if (accumulatedText[pos] === '`' && (pos === 0 || accumulatedText[pos - 1] !== '\\')) {
            closingIdx = pos;
            break;
          }
        }
        
        if (closingIdx !== -1) {
          // Extract content before the closing backtick
          const content = accumulatedText.slice(0, closingIdx);
          
          // Unescape template literal escapes to get the actual string value
          let realContent = content;
          realContent = realContent.replace(/\\\\/g, '\\');
          realContent = realContent.replace(/\\`/g, '`');
          
          // Write the fixed line
          out.push(`${indent}${prefix}${JSON.stringify(realContent)},`);
          fixed++;
          
          i = lessonEndIdx + 1;
        } else {
          out.push(line);
          i++;
        }
        
        if (closingIdx === -1) {
          // Failed to find closing backtick, keep original line
          out.push(line);
          i++;
        }
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
  console.log(`Fixed: ${file} (had ${fixed} template strings, ${lines.length} -> ${out.length} lines)`);
}
