import type { CourseContent } from '../../types';
import { awsSolutionsArchitect as awsSolutionsArchitectData } from './courses/aws-solutions-architect-courses';
import awsSolutionsArchitectExercises from './exercises/aws-solutions-architect-exercises';
import awsSolutionsArchitectProject from './projects/aws-solutions-architect-projects';

export const awsSolutionsArchitect: CourseContent = {
  ...awsSolutionsArchitectData,
  lessons: awsSolutionsArchitectData.lessons.map((l, i) => ({
    ...l,
    exercise: awsSolutionsArchitectExercises[i],
  })) as CourseContent['lessons'],
  project: awsSolutionsArchitectProject,
};
