import type { CourseContent } from '../../types';
import { pythonBackend as pythonBackendData } from './courses/python-backend-courses';
import pythonBackendExercises from './exercises/python-backend-exercises';
import pythonBackendProject from './projects/python-backend-projects';

export const pythonBackend: CourseContent = {
  ...pythonBackendData,
  lessons: pythonBackendData.lessons.map((l, i) => ({
    ...l,
    exercise: pythonBackendExercises[i],
  })) as CourseContent['lessons'],
  project: pythonBackendProject,
};
