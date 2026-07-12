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
  const src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const cmIdx = line.indexOf('contentMarkdown:');
    
    if (cmIdx !== -1) {
      const indent = line.slice(0, cmIdx);
      const afterColon = line.slice(cmIdx + 'contentMarkdown:'.length).trim();
      
      // Check if this is a JSON string (starts with `"`)
      if (afterColon.startsWith('"')) {
        // Find the end of the JSON string
        let j = 1;
        let jsonEnd = -1;
        while (j < afterColon.length) {
          if (afterColon[j] === '\\') { j += 2; continue; }
          if (afterColon[j] === '"') { jsonEnd = j; break; }
          j++;
        }
        
        if (jsonEnd !== -1) {
          // Extract the JSON string
          const jsonStr = afterColon.slice(0, jsonEnd + 1);
          let partialContent: string;
          try { partialContent = JSON.parse(jsonStr); } catch { partialContent = jsonStr.slice(1, -1); }
          
          // Now find where this lesson ends - look for `    },` or `  },`
          // The bare text is everything between this line (after the JSON string) and the lesson close
          let k = i;
          let lessonEndLine = -1;
          
          while (k < lines.length) {
            const t = lines[k].trim();
            // Check if this line closes the lesson: }, or a line where the first non-whitespace is }
            if ((t.startsWith('},') || t === '}') && k > i) {
              lessonEndLine = k;
              break;
            }
            k++;
          }
          
          if (lessonEndLine !== -1) {
            // Collect the bare text content
            const bareParts: string[] = [];
            // Start from the NEXT line after the JSON string's comma
            // The current line has the full json string
            // Everything after the closing `"` and `,` is... empty since this is all on one line
            
            // Collect bare text from line i+1 to lessonEndLine-1
            for (let n = i + 1; n < lessonEndLine; n++) {
              bareParts.push(lines[n]);
            }
            
            const bareText = bareParts.join('\n');
            let fullContent = partialContent + bareText;
            
            // Unescape template literal escapes that weren't processed:
            // `\`` -> `  (escaped backtick in template literal)
            // `\\` -> \  (escaped backslash)
            // But only unescape if \ is not already escaped (which it might be from JSON)
            // Simpler: just do the unescape
            fullContent = fullContent.replace(/\\`/g, '`').replace(/\\\\/g, '\\');
            
            // Write the line with proper JSON escaping
            out.push(`${indent}contentMarkdown: ${JSON.stringify(fullContent)},`);
            i = lessonEndLine;
          } else {
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
    } else {
      out.push(line);
      i++;
    }
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  console.log(`Fixed: ${file} (${lines.length} -> ${out.length} lines)`);
}
