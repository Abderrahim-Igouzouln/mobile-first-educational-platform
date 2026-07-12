import type { CourseContent } from '../../types';
import { reactFundamentals as reactFundamentalsData } from './courses/react-fundamentals-courses';
import reactFundamentalsExercises from './exercises/react-fundamentals-exercises';
import reactFundamentalsProject from './projects/react-fundamentals-projects';

export const reactFundamentals: CourseContent = {
  ...reactFundamentalsData,
  lessons: reactFundamentalsData.lessons.map((l, i) => ({
    ...l,
    exercise: reactFundamentalsExercises[i],
  })) as CourseContent['lessons'],
  project: reactFundamentalsProject,
};
