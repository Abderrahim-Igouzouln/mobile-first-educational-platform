import { readFileSync } from 'fs';
import { resolve } from 'path';

const courses = [
  'frontend/vuejs-advanced/courses/vuejs-advanced-courses',
  'backend/nodejs-microservices/courses/nodejs-microservices-courses',
  'backend/python-backend/courses/python-backend-courses',
  'backend/python-data-science/courses/python-data-science-courses',
  'mobile/react-native-advanced/courses/react-native-advanced-courses',
  'mobile/flutter-intro/courses/flutter-intro-courses',
  'mobile/flutter-advanced/courses/flutter-advanced-courses',
  'devops-cloud/docker-production/courses/docker-production-courses',
  'devops-cloud/aws-cloud-practitioner/courses/aws-cloud-practitioner-courses',
  'devops-cloud/aws-solutions-architect/courses/aws-solutions-architect-courses',
];

const base = resolve('prisma/content');

for (const c of courses) {
  const fp = resolve(base, c + '.ts');
  const src = readFileSync(fp, 'utf-8');
  // Check basic syntax: count opening and closing quotes
  const lines = src.split('\n');
  let inString = false;
  let stringChar = '';
  let error = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '\\' && inString) {
        j++; // skip escaped char
        continue;
      }
      if (inString) {
        if (ch === stringChar) inString = false;
      } else {
        if (ch === '"' || ch === "'" || ch === '`') {
          inString = true;
          stringChar = ch;
        }
      }
    }
    if (inString && stringChar === '"') {
      // If we're still in a double-quoted string at end of line, it's an error
      error = `Line ${i + 1}: Unterminated double-quoted string`;
      break;
    }
  }
  if (error) {
    process.stderr.write(`FAIL: ${c} - ${error}\n`);
  } else {
    process.stdout.write(`OK: ${c}\n`);
  }
}
