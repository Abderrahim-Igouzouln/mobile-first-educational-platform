import { NavigatorScreenParams } from '@react-navigation/native';
import type { QuizResult } from '../../modules/exercises/exercises.types';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  VerifyEmail: { email?: string };
  BiometricSetup: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CoursesTab: NavigatorScreenParams<CourseStackParamList>;
  ExercisesTab: NavigatorScreenParams<ExerciseStackParamList>;
  CertificationsTab: NavigatorScreenParams<CertificationStackParamList>;
  CommunityTab: NavigatorScreenParams<CommunityStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  DashboardScreen: undefined;
  SearchScreen: undefined;
  RoadmapScreen: undefined;
};

export type CommunityStackParamList = {
  CommunityScreen: undefined;
  DiscussionScreen: { discussionId: string };
  NewPostScreen: undefined;
  MentorshipScreen: undefined;
  StudyGroupsScreen: undefined;
  StudyGroupDetailScreen: { groupId: string };
  MentorProfileScreen: { mentorId: string };
};

export type CourseStackParamList = {
  DomainsScreen: undefined;
  TechnologiesScreen: { domainId?: string };
  CourseScreen: { technologySlug: string };
  LessonScreen: { courseId: string; lessonId: string };
  LectureScreen: { courseId: string; lessonId: string; lectureId: string };
  VideoPlayerScreen: { videoUrl: string; title?: string };
  OfflineCoursesScreen: undefined;
  ProjectsScreen: { courseId?: string };
  ProjectDetailScreen: { projectId: string };
  ProjectSubmissionScreen: { projectId: string };
  ProjectReviewScreen: { projectId: string; submissionId: string };
};

export type ExerciseStackParamList = {
  ExercisesScreen: { lessonId: string; lessonTitle?: string };
  QuizScreen: { exerciseId: string; lessonId: string };
  ExerciseResultScreen: { result: QuizResult };
  ExerciseReviewScreen: { result: QuizResult };
  ExerciseHistoryScreen: { lessonId: string; lessonTitle?: string };
};

export type CertificationStackParamList = {
  CertificationsListScreen: undefined;
  CertificationDetailScreen: { certificationId: string };
  ExamScreen: { certificationId: string };
  CertificateViewScreen: { certificateNumber: string };
  CertificationResultScreen: { certificationId: string; passed: boolean; score: number; totalQuestions: number; sectionScores?: Array<{ sectionTitle: string; score: number; total: number }> };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  SettingsScreen: undefined;
  InstructorDashboardScreen: undefined;
  NotificationCenterScreen: undefined;
  SubscriptionScreen: undefined;
  PaymentScreen: { planId: string; planName: string; price: number };
  PaymentSuccessScreen: { planName: string; startDate: string; nextBilling: string };
  LanguageScreen: undefined;
  SecurityScreen: undefined;
  NotificationSettingsScreen: undefined;
  DataSettingsScreen: undefined;
  AboutScreen: undefined;
};
