import type { CourseContent } from '../../types';
import { awsCloudPractitioner as awsCloudPractitionerData } from './courses/aws-cloud-practitioner-courses';
import awsCloudPractitionerExercises from './exercises/aws-cloud-practitioner-exercises';
import awsCloudPractitionerProject from './projects/aws-cloud-practitioner-projects';

export const awsCloudPractitioner: CourseContent = {
  ...awsCloudPractitionerData,
  lessons: awsCloudPractitionerData.lessons.map((l, i) => ({
    ...l,
    exercise: awsCloudPractitionerExercises[i],
  })) as CourseContent['lessons'],
  project: awsCloudPractitionerProject,
};
