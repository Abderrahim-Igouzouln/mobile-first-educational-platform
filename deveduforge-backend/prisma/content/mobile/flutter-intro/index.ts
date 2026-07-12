import type { CourseContent } from '../../types';
import { flutterIntro as flutterIntroData } from './courses/flutter-intro-courses';
import flutterIntroExercises from './exercises/flutter-intro-exercises';
import flutterIntroProject from './projects/flutter-intro-projects';

export const flutterIntro: CourseContent = {
  ...flutterIntroData,
  lessons: flutterIntroData.lessons.map((l, i) => ({
    ...l,
    exercise: flutterIntroExercises[i],
  })) as CourseContent['lessons'],
  project: flutterIntroProject,
};
