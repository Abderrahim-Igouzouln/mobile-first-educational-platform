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
  let inTemplateLiteral = false;
  let outputLines = [];

  for (const line of lines) {
    if (line.includes('contentMarkdown:') && line.includes('`')) {
      inTemplateLiteral = true;
    }
    
    if (inTemplateLiteral && line.includes('`')) {
      // Check if this line closes the template literal
      // Template literal closes with a backtick that is NOT followed by more content
      // (except maybe a comma on the next line)
      const backtickCount = (line.match(/`/g) || []).length;
      if (backtickCount > 1) {
        // Multiple backticks on this line (e.g., code fences)
        // Only the LAST unpaired backtick (even count means paired)
        // If odd count, it might be closing
        inTemplateLiteral = backtickCount % 2 !== 0;
      } else {
        inTemplateLiteral = false;
      }
    }

    if (inTemplateLiteral) {
      // Escape ${ } but not $ already escaped
      outputLines.push(line.replace(/(?<!\\)\$\{/g, '\\${'));
    } else {
      outputLines.push(line);
    }
  }

  writeFileSync(fp, outputLines.join('\n'), 'utf-8');
  console.log(`Fixed: ${file}`);
}
