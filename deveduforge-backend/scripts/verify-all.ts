import { ALL_COURSE_CONTENT } from '../prisma/content/index';

const titles = Object.keys(ALL_COURSE_CONTENT);
console.log(`Total courses: ${titles.length}`);
for (const t of titles) {
  const c = ALL_COURSE_CONTENT[t];
  const hasAllExercises = c.lessons.every(l => !!l.exercise);
  const totalQuestions = c.lessons.reduce((s, l) => s + l.exercise.questions.length, 0);
  console.log(`  ${t}`);
  console.log(`    lessons: ${c.lessons.length} | exercises complete: ${hasAllExercises} | questions: ${totalQuestions} | project: ${c.project?.title}`);
}
