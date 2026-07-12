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

function isLessonOpening(line: string): boolean {
  return line.trim() === '{' && line.trimEnd() === line;
}

function isLessonClosing(line: string): boolean {
  const t = line.trim();
  return t.startsWith('},') || t === '}';
}

for (const file of files) {
  const fp = resolve(base, file);
  const src = readFileSync(fp, 'utf-8');
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect a lesson opening: a standalone `{` at the start of the text (after indent)
    if (isLessonOpening(line) && i + 1 < lines.length) {
      // Peek at the next line to see if this looks like a lesson (has `title:` or `"title":`)
      const peek = lines[i + 1].trim();
      if (peek.startsWith('title:') || peek.startsWith('"title":') || peek.startsWith('"title" :')) {
        // This is a lesson block - extract it
        const lessonLines: string[] = [];
        let j = i;
        let depth = 0;
        let foundLessonEnd = false;
        
        // Read until we find the matching `},`
        let k = i;
        while (k < lines.length) {
          const l = lines[k];
          lessonLines.push(l);
          if (l.includes('{')) depth++;
          const closeIdx = l.indexOf('}');
          if (closeIdx !== -1 && depth > 0) {
            // Check if this } closes the lesson
            if (l.trim().startsWith('},') || (l.includes('},') && l.trim() !== '}' && depth <= 1)) {
              // Check depth - if we're at depth 1, this closes the lesson
              if (depth <= 1) {
                foundLessonEnd = true;
                k++;
                break;
              }
            }
          }
          k++;
        }
        
        if (foundLessonEnd) {
          // Parse the lesson block
          const lessonBlock = lessonLines.join('\n');
          const reconstructed = reconstructLesson(lessonBlock, file);
          if (reconstructed) {
            out.push(reconstructed);
            i = k;
            continue;
          }
        }
      }
    }
    
    out.push(line);
    i++;
  }

  writeFileSync(fp, out.join('\n'), 'utf-8');
  console.log(`Fixed: ${file} (${lines.length} -> ${out.length} lines)`);
}

function reconstructLesson(block: string, fileName: string): string | null {
  const lines = block.split('\n');
  
  // Extract title
  let title = '';
  let durationMin = '';
  let contentLines: string[] = [];
  let inContentMarkdown = false;
  let contentDone = false;
  let lessonCloser = '';
  
  for (const line of lines) {
    const t = line.trim();
    
    if (t.startsWith('title:') || t.startsWith('"title":')) {
      title = t.replace(/^"?(title)"?:\s*/, '').replace(/,$/, '').trim();
      continue;
    }
    
    if (t.startsWith('durationMin:') || t.startsWith('"durationMin":')) {
      durationMin = t.replace(/^"?durationMin"?:\s*/, '').replace(/,$/, '').trim();
      continue;
    }
    
    if (t.startsWith('contentMarkdown:') || t.startsWith('"contentMarkdown":')) {
      inContentMarkdown = true;
      // Extract the value after `contentMarkdown: `
      const afterColon = line.slice(line.indexOf(':') + 1).trim();
      
      if (afterColon.startsWith('`')) {
        // Template literal
        const content = extractTemplateContent(fileName, lines.indexOf(line), block.split('\n'));
        if (content) {
          contentLines = [content];
          inContentMarkdown = false;
          contentDone = true;
        }
      } else if (afterColon.startsWith('"')) {
        // JSON-style string - might be partial (corrupted by previous script)
        const endQuoteIdx = findEndOfString(afterColon, 0);
        if (endQuoteIdx !== -1) {
          const jsonPart = afterColon.slice(0, endQuoteIdx + 1);
          try {
            const parsed = JSON.parse(jsonPart);
            contentLines = [parsed];
          } catch {
            contentLines = [jsonPart];
          }
        }
        inContentMarkdown = false;
        contentDone = false; // might have more content after
        continue;
      } else {
        inContentMarkdown = false;
        contentDone = true;
      }
      continue;
    }
    
    if (inContentMarkdown && !contentDone) {
      // Check if this is bare content (not part of the lesson structure)
      if (t === '},' || t === '}') {
        lessonCloser = t;
        contentDone = true;
        inContentMarkdown = false;
        continue;
      }
      
      // This is bare text content (from the corrupted state)
      // It's part of the contentMarkdown but outside the broken JSON string
      contentLines.push(line);
      continue;
    }
  }
  
  // Reconstruct the full content
  const fullContent = contentLines.join('\n');
  
  if (!title || !durationMin) {
    console.log(`  [${fileName}] Skipped block, missing title/durationMin: ${title}/${durationMin}`);
    console.log(`  First few lines: ${lines.slice(0,5).join(' | ')}`);
    return null;
  }
  
  // Generate the reconstructed lesson
  // Unescape any remaining template literal escapes
  const realContent = fullContent
    .replace(/\\\\/g, '\\')
    .replace(/\\`/g, '`');
  
  const escaped = JSON.stringify(realContent);
  
  // Get indentation from first line
  const indent = lines[0].match(/^\s*/)?.[0] || '  ';
  
  return `${indent}{\n${indent}  "title": ${title},\n${indent}  "durationMin": ${durationMin},\n${indent}  "contentMarkdown": ${escaped},\n${indent}}`;
}

function extractTemplateContent(fileName: string, startLine: number, allLines: string[]): string | null {
  // Find the opening backtick and extract content until the closing backtick
  const line = allLines[startLine];
  const btIdx = line.indexOf('`');
  if (btIdx === -1) return null;
  
  let content = line.slice(btIdx + 1); // text after opening backtick
  let j = startLine;
  
  // Find closing backtick - must handle `\`` escape sequences properly
  // A closing backtick is a bare backtick (not preceded by \) at the end of content
  while (j < allLines.length) {
    const currentLine = j === startLine ? '' : allLines[j];
    if (currentLine) {
      // Check for closing backtick in this line
      // Scan for backtick characters that are NOT preceded by backslash
      for (let c = 0; c < currentLine.length; c++) {
        if (currentLine[c] === '`' && (c === 0 || currentLine[c - 1] !== '\\')) {
          // Found a bare backtick - check if it's the closing delimiter
          const after = currentLine.slice(c + 1).trim();
          if (after === '' || after === ',') {
            content += '\n' + currentLine.slice(0, c);
            return content;
          }
        }
      }
    }
    content += '\n' + currentLine;
    j++;
  }
  
  return content;
}

function findEndOfString(s: string, startIdx: number): number {
  // Find the closing double quote of a JSON string, respecting escape sequences
  let i = startIdx;
  while (i < s.length) {
    if (s[i] === '\\') {
      i += 2; // skip escape sequence
      continue;
    }
    if (s[i] === '"') {
      return i; // found closing quote
    }
    i++;
  }
  return -1;
}
