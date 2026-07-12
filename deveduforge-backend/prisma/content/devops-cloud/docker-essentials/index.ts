import type { CourseContent } from '../../types';
import { dockerEssentials as dockerEssentialsData } from './courses/docker-essentials-courses';
import dockerEssentialsExercises from './exercises/docker-essentials-exercises';
import dockerEssentialsProject from './projects/docker-essentials-projects';

export const dockerEssentials: CourseContent = {
  ...dockerEssentialsData,
  lessons: dockerEssentialsData.lessons.map((l, i) => ({
    ...l,
    exercise: dockerEssentialsExercises[i],
  })) as CourseContent['lessons'],
  project: dockerEssentialsProject,
};
