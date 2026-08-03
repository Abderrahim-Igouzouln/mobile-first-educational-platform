import type { CourseContent } from '../../types';
import { reactNativeFoundation as reactNativeFoundationData } from './courses/react-native-foundation-courses';
import reactNativeFoundationExercises from './exercises/react-native-foundation-exercises';
import reactNativeFoundationProject from './projects/react-native-foundation-projects';

export const reactNativeFoundation: CourseContent = {
  ...reactNativeFoundationData,
  lessons: reactNativeFoundationData.lessons.map((l, i) => ({
    ...l,
    exercise: reactNativeFoundationExercises[i],
  })) as CourseContent['lessons'],
  project: reactNativeFoundationProject,
};
