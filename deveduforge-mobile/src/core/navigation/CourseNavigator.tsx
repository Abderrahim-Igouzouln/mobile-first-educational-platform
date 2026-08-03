import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourseStackParamList } from './navigation.types';
import { DomainsScreen } from '../../modules/courses/screens/DomainsScreen';
import { TechnologiesScreen } from '../../modules/courses/screens/TechnologiesScreen';
import { CourseScreen } from '../../modules/courses/screens/CourseScreen';
import { LessonScreen } from '../../modules/courses/screens/LessonScreen';
import { LectureScreen } from '../../modules/courses/screens/LectureScreen';
import { VideoPlayerScreen } from '../../modules/courses/screens/VideoPlayerScreen';
import { OfflineCoursesScreen } from '../../modules/courses/screens/OfflineCoursesScreen';
import { CourseReviewsScreen } from '../../modules/courses/screens/CourseReviewsScreen';
import { CourseCompleteScreen } from '../../modules/courses/screens/CourseCompleteScreen';
import { ProjectsScreen } from '../../modules/projects/screens/ProjectsScreen';
import { ProjectDetailScreen } from '../../modules/projects/screens/ProjectDetailScreen';
import { ProjectSubmissionScreen } from '../../modules/projects/screens/ProjectSubmissionScreen';
import { ProjectReviewScreen } from '../../modules/projects/screens/ProjectReviewScreen';

const Stack = createNativeStackNavigator<CourseStackParamList>();

const screens: {
  name: keyof CourseStackParamList;
  component: React.ComponentType<any>;
}[] = [
  { name: 'DomainsScreen', component: DomainsScreen },
  { name: 'TechnologiesScreen', component: TechnologiesScreen },
  { name: 'CourseScreen', component: CourseScreen },
  { name: 'LessonScreen', component: LessonScreen },
  { name: 'LectureScreen', component: LectureScreen },
  { name: 'VideoPlayerScreen', component: VideoPlayerScreen },
  { name: 'OfflineCoursesScreen', component: OfflineCoursesScreen },
  { name: 'ProjectsScreen', component: ProjectsScreen },
  { name: 'ProjectDetailScreen', component: ProjectDetailScreen },
  { name: 'ProjectSubmissionScreen', component: ProjectSubmissionScreen },
  { name: 'ProjectReviewScreen', component: ProjectReviewScreen },
  { name: 'CourseReviewsScreen', component: CourseReviewsScreen },
  { name: 'CourseCompleteScreen', component: CourseCompleteScreen },
];

export default function CourseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}
