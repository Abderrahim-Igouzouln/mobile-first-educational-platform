import type { CourseContent } from '../../types';
import { vuejsIntro as vuejsIntroData } from './courses/vuejs-intro-courses';
import vuejsIntroExercises from './exercises/vuejs-intro-exercises';
import vuejsIntroProject from './projects/vuejs-intro-projects';

export const vuejsIntro: CourseContent = {
  ...vuejsIntroData,
  lessons: vuejsIntroData.lessons.map((l, i) => ({
    ...l,
    exercise: vuejsIntroExercises[i],
  })) as CourseContent['lessons'],
  project: vuejsIntroProject,
};
