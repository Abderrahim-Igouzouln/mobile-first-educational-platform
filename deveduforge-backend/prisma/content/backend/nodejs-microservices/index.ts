import type { CourseContent } from '../../types';
import { nodejsMicroservices as nodejsMicroservicesData } from './courses/nodejs-microservices-courses';
import nodejsMicroservicesExercises from './exercises/nodejs-microservices-exercises';
import nodejsMicroservicesProject from './projects/nodejs-microservices-projects';

export const nodejsMicroservices: CourseContent = {
  ...nodejsMicroservicesData,
  lessons: nodejsMicroservicesData.lessons.map((l, i) => ({
    ...l,
    exercise: nodejsMicroservicesExercises[i],
  })) as CourseContent['lessons'],
  project: nodejsMicroservicesProject,
};
