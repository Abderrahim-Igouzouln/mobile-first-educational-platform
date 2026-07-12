import type { CourseContent } from '../../types';
import { vuejsAdvanced as vuejsAdvancedData } from './courses/vuejs-advanced-courses';
import vuejsAdvancedExercises from './exercises/vuejs-advanced-exercises';
import vuejsAdvancedProject from './projects/vuejs-advanced-projects';

export const vuejsAdvanced: CourseContent = {
  ...vuejsAdvancedData,
  lessons: vuejsAdvancedData.lessons.map((l, i) => ({
    ...l,
    exercise: vuejsAdvancedExercises[i],
  })) as CourseContent['lessons'],
  project: vuejsAdvancedProject,
};
