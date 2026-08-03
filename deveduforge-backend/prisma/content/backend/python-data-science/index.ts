import type { CourseContent } from '../../types';
import { pythonDataScience as pythonDataScienceData } from './courses/python-data-science-courses';
import pythonDataScienceExercises from './exercises/python-data-science-exercises';
import pythonDataScienceProject from './projects/python-data-science-projects';

export const pythonDataScience: CourseContent = {
  ...pythonDataScienceData,
  lessons: pythonDataScienceData.lessons.map((l, i) => ({
    ...l,
    exercise: pythonDataScienceExercises[i],
  })) as CourseContent['lessons'],
  project: pythonDataScienceProject,
};
