import { readFileSync, statSync } from 'fs';
import { resolve } from 'path';

const files = [
  ['frontend/react-fundamentals', 'courses/react-fundamentals-courses.ts', 'OK'],
  ['frontend/react-advanced', 'courses/react-advanced-courses.ts', 'OK'],
  ['frontend/vuejs-intro', 'courses/vuejs-intro-courses.ts', 'OK'],
  ['frontend/vuejs-advanced', 'courses/vuejs-advanced-courses.ts', 'FIXED'],
  ['backend/nodejs-practice', 'courses/nodejs-practice-courses.ts', 'OK'],
  ['backend/nodejs-microservices', 'courses/nodejs-microservices-courses.ts', 'BROKEN'],
  ['backend/python-backend', 'courses/python-backend-courses.ts', 'BACKTICK'],
  ['backend/python-data-science', 'courses/python-data-science-courses.ts', 'BACKTICK'],
  ['mobile/react-native-foundation', 'courses/react-native-foundation-courses.ts', 'OK'],
  ['mobile/react-native-advanced', 'courses/react-native-advanced-courses.ts', 'BROKEN'],
  ['mobile/flutter-intro', 'courses/flutter-intro-courses.ts', 'BROKEN'],
  ['mobile/flutter-advanced', 'courses/flutter-advanced-courses.ts', 'BROKEN'],
  ['devops-cloud/docker-essentials', 'courses/docker-essentials-courses.ts', 'OK'],
  ['devops-cloud/docker-production', 'courses/docker-production-courses.ts', 'OK'],
  ['devops-cloud/aws-cloud-practitioner', 'courses/aws-cloud-practitioner-courses.ts', 'OK'],
  ['devops-cloud/aws-solutions-architect', 'courses/aws-solutions-architect-courses.ts', 'OK'],
];

const base = resolve('prisma/content');

type CourseCheck = { status: string; errors: string[] };

async function main() {
  const results: Record<string, CourseCheck> = {};
  
  for (const [dir, file, _label] of files) {
    const fp = resolve(base, dir, file);
    const display = `${dir}/${file}`;
    try {
      const mod = await import(fp);
      results[display] = { status: 'OK', errors: [] };
    } catch (e: any) {
      results[display] = { status: 'FAIL', errors: [e.message] };
    }
  }
  
  for (const [name, result] of Object.entries(results)) {
    const icon = result.status === 'OK' ? '✅' : '❌';
    process.stdout.write(`${icon} ${name}\n`);
    if (result.errors.length) {
      process.stdout.write(`   ${result.errors[0].split('\n')[0]}\n`);
    }
  }
}

main().catch(console.error);
