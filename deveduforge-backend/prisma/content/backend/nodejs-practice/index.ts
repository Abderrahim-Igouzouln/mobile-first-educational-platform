import type { CourseContent } from '../../types';
import { nodejsPractice as nodejsPracticeData } from './courses/nodejs-practice-courses';
import nodejsPracticeExercises from './exercises/nodejs-practice-exercises';
import nodejsPracticeProject from './projects/nodejs-practice-projects';

export const nodejsPractice: CourseContent = {
  ...nodejsPracticeData,
  lessons: nodejsPracticeData.lessons.map((l, i) => ({
    ...l,
    exercise: nodejsPracticeExercises[i],
  })) as CourseContent['lessons'],
  project: nodejsPracticeProject,
};
