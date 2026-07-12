import type { CourseContent, ContentLessonBase, ContentExercise, ContentProject, ContentQuestion } from './types';
import { reactFundamentals } from './frontend/react-fundamentals';
import { reactAdvanced } from './frontend/react-advanced';
import { vuejsIntro } from './frontend/vuejs-intro';
import { vuejsAdvanced } from './frontend/vuejs-advanced';
import { nodejsPractice } from './backend/nodejs-practice';
import { nodejsMicroservices } from './backend/nodejs-microservices';
import { pythonBackend } from './backend/python-backend';
import { pythonDataScience } from './backend/python-data-science';
import { reactNativeFoundation } from './mobile/react-native-foundation';
import { reactNativeAdvanced } from './mobile/react-native-advanced';
import { flutterIntro } from './mobile/flutter-intro';
import { flutterAdvanced } from './mobile/flutter-advanced';
import { dockerEssentials } from './devops-cloud/docker-essentials';
import { dockerProduction } from './devops-cloud/docker-production';
import { awsCloudPractitioner } from './devops-cloud/aws-cloud-practitioner';
import { awsSolutionsArchitect } from './devops-cloud/aws-solutions-architect';

export type { CourseContent, ContentLessonBase, ContentExercise, ContentProject, ContentQuestion };

export const ALL_COURSE_CONTENT: Record<string, CourseContent> = {
  'Fondamentaux de React': reactFundamentals,
  'React Avancé': reactAdvanced,
  'Introduction à Vue.js 3': vuejsIntro,
  'Vue.js Avancé avec Pinia': vuejsAdvanced,
  'Node.js par la pratique': nodejsPractice,
  'Node.js : Microservices': nodejsMicroservices,
  'Python pour le Backend': pythonBackend,
  'Python Data Science': pythonDataScience,
  'React Native Foundation': reactNativeFoundation,
  'React Native Avancé': reactNativeAdvanced,
  'Flutter pour débutants': flutterIntro,
  'Flutter : Applications complexes': flutterAdvanced,
  'Docker Essentials': dockerEssentials,
  'Docker en Production': dockerProduction,
  'AWS Cloud Practitioner': awsCloudPractitioner,
  'AWS Solutions Architect': awsSolutionsArchitect,
};
