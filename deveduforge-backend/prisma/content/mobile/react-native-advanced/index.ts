import type { CourseContent } from '../../types';
import { reactNativeAdvanced as reactNativeAdvancedData } from './courses/react-native-advanced-courses';
import reactNativeAdvancedExercises from './exercises/react-native-advanced-exercises';
import reactNativeAdvancedProject from './projects/react-native-advanced-projects';

export const reactNativeAdvanced: CourseContent = {
  ...reactNativeAdvancedData,
  lessons: reactNativeAdvancedData.lessons.map((l, i) => ({
    ...l,
    exercise: reactNativeAdvancedExercises[i],
  })) as CourseContent['lessons'],
  project: reactNativeAdvancedProject,
};
