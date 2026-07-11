import { reactFundamentals } from './react-fundamentals';
import { reactAdvanced } from './react-advanced';
import { vuejsIntro } from './vuejs-intro';
import { nodejsPractice } from './nodejs-practice';
import { reactNativeFoundation } from './react-native-foundation';
import { dockerEssentials } from './docker-essentials';
import type { CourseContent, ContentLesson, ContentProject } from './react-fundamentals';

export { reactFundamentals, reactAdvanced, vuejsIntro, nodejsPractice, reactNativeFoundation, dockerEssentials };
export type { CourseContent, ContentLesson, ContentProject };

export const ALL_COURSE_CONTENT: Record<string, CourseContent> = {
  'Fondamentaux de React': reactFundamentals,
  'React Avancé': reactAdvanced,
  'Introduction à Vue.js 3': vuejsIntro,
  'Node.js par la pratique': nodejsPractice,
  'React Native Foundation': reactNativeFoundation,
  'Docker Essentials': dockerEssentials,
};
