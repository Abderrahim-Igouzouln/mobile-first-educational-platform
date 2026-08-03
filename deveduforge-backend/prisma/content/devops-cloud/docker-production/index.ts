import type { CourseContent } from '../../types';
import { dockerProduction as dockerProductionData } from './courses/docker-production-courses';
import dockerProductionExercises from './exercises/docker-production-exercises';
import dockerProductionProject from './projects/docker-production-projects';

export const dockerProduction: CourseContent = {
  ...dockerProductionData,
  lessons: dockerProductionData.lessons.map((l, i) => ({
    ...l,
    exercise: dockerProductionExercises[i],
  })) as CourseContent['lessons'],
  project: dockerProductionProject,
};
