import type { CourseContent } from '../../types';
import { flutterAdvanced as flutterAdvancedData } from './courses/flutter-advanced-courses';
import flutterAdvancedExercises from './exercises/flutter-advanced-exercises';
import flutterAdvancedProject from './projects/flutter-advanced-projects';

export const flutterAdvanced: CourseContent = {
  ...flutterAdvancedData,
  lessons: flutterAdvancedData.lessons.map((l, i) => ({
    ...l,
    exercise: flutterAdvancedExercises[i],
  })) as CourseContent['lessons'],
  project: flutterAdvancedProject,
};
