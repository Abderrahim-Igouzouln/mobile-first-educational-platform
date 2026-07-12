import type { CourseContent } from '../../types';
import { reactAdvanced as reactAdvancedData } from './courses/react-advanced-courses';
import reactAdvancedExercises from './exercises/react-advanced-exercises';
import reactAdvancedProject from './projects/react-advanced-projects';

export const reactAdvanced: CourseContent = {
  ...reactAdvancedData,
  lessons: reactAdvancedData.lessons.map((l, i) => ({
    ...l,
    exercise: reactAdvancedExercises[i],
  })) as CourseContent['lessons'],
  project: reactAdvancedProject,
};
