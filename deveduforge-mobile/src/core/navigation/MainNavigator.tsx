import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { House, BookOpen, PenTool, Award, MessageCircle, User } from 'lucide-react-native';
import {
  MainTabParamList,
  HomeStackParamList,
  CommunityStackParamList,
  ExerciseStackParamList,
  CertificationStackParamList,
  ProfileStackParamList,
} from './navigation.types';
import CourseNavigator from './CourseNavigator';
import HomeScreen from '../../modules/home/screens/HomeScreen';
import DashboardScreen from '../../modules/home/screens/DashboardScreen';
import SearchScreen from '../../modules/home/screens/SearchScreen';
import { RoadmapScreen } from '../../modules/home/screens/RoadmapScreen';
import CommunityScreen from '../../modules/community/screens/CommunityScreen';
import DiscussionScreen from '../../modules/community/screens/DiscussionScreen';
import NewPostScreen from '../../modules/community/screens/NewPostScreen';
import MentorshipScreen from '../../modules/community/screens/MentorshipScreen';
import StudyGroupsScreen from '../../modules/community/screens/StudyGroupsScreen';
import StudyGroupDetailScreen from '../../modules/community/screens/StudyGroupDetailScreen';
import MentorProfileScreen from '../../modules/community/screens/MentorProfileScreen';
import { ExercisesScreen } from '../../modules/exercises/screens/ExercisesScreen';
import { QuizScreen } from '../../modules/exercises/screens/QuizScreen';
import { ExerciseResultScreen } from '../../modules/exercises/screens/ExerciseResultScreen';
import { ExerciseReviewScreen } from '../../modules/exercises/screens/ExerciseReviewScreen';
import { ExerciseHistoryScreen } from '../../modules/exercises/screens/ExerciseHistoryScreen';
import CertificationsScreen from '../../modules/certifications/screens/CertificationsScreen';
import CertificationExamScreen from '../../modules/certifications/screens/CertificationExamScreen';
import CertificationResultScreen from '../../modules/certifications/screens/CertificationResultScreen';
import CertificateDetailScreen from '../../modules/certifications/screens/CertificateDetailScreen';
import CertificateViewScreen from '../../modules/certifications/screens/CertificateViewScreen';
import ProfileScreen from '../../modules/profile/screens/ProfileScreen';
import SettingsScreen from '../../modules/profile/screens/SettingsScreen';
import EditProfileScreen from '../../modules/profile/screens/EditProfileScreen';
import LanguageScreen from '../../modules/profile/screens/LanguageScreen';
import SecurityScreen from '../../modules/profile/screens/SecurityScreen';
import NotificationSettingsScreen from '../../modules/profile/screens/NotificationSettingsScreen';
import DataSettingsScreen from '../../modules/profile/screens/DataSettingsScreen';
import AboutScreen from '../../modules/profile/screens/AboutScreen';
import SubscriptionScreen from '../../modules/subscription/screens/SubscriptionScreen';
import { InstructorDashboardScreen } from '../../modules/instructor/screens/InstructorDashboardScreen';
import { NotificationCenterScreen } from '../../modules/notifications/screens/NotificationCenterScreen';
import PaymentScreen from '../../modules/subscription/screens/PaymentScreen';
import PaymentSuccessScreen from '../../modules/subscription/screens/PaymentSuccessScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} />
    <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
    <HomeStack.Screen name="RoadmapScreen" component={RoadmapScreen} />
  </HomeStack.Navigator>
);

const CommunityStack = createNativeStackNavigator<CommunityStackParamList>();
const CommunityNavigator = () => (
  <CommunityStack.Navigator screenOptions={{ headerShown: false }}>
    <CommunityStack.Screen name="CommunityScreen" component={CommunityScreen} />
    <CommunityStack.Screen name="DiscussionScreen" component={DiscussionScreen} />
    <CommunityStack.Screen name="NewPostScreen" component={NewPostScreen} />
    <CommunityStack.Screen name="MentorshipScreen" component={MentorshipScreen} />
    <CommunityStack.Screen name="StudyGroupsScreen" component={StudyGroupsScreen} />
    <CommunityStack.Screen name="StudyGroupDetailScreen" component={StudyGroupDetailScreen} />
    <CommunityStack.Screen name="MentorProfileScreen" component={MentorProfileScreen} />
  </CommunityStack.Navigator>
);

const ExerciseStack = createNativeStackNavigator<ExerciseStackParamList>();
const ExerciseNavigator = () => (
  <ExerciseStack.Navigator screenOptions={{ headerShown: false }}>
    <ExerciseStack.Screen name="ExercisesScreen" component={ExercisesScreen} />
    <ExerciseStack.Screen name="QuizScreen" component={QuizScreen} />
    <ExerciseStack.Screen name="ExerciseResultScreen" component={ExerciseResultScreen} />
    <ExerciseStack.Screen name="ExerciseReviewScreen" component={ExerciseReviewScreen} />
    <ExerciseStack.Screen name="ExerciseHistoryScreen" component={ExerciseHistoryScreen} />
  </ExerciseStack.Navigator>
);

const CertificationStack = createNativeStackNavigator<CertificationStackParamList>();
const CertificationNavigator = () => (
  <CertificationStack.Navigator screenOptions={{ headerShown: false }}>
    <CertificationStack.Screen name="CertificationsListScreen" component={CertificationsScreen} />
    <CertificationStack.Screen name="CertificationDetailScreen" component={CertificateDetailScreen} />
    <CertificationStack.Screen name="ExamScreen" component={CertificationExamScreen} />
    <CertificationStack.Screen name="CertificationResultScreen" component={CertificationResultScreen} />
    <CertificationStack.Screen name="CertificateViewScreen" component={CertificateViewScreen} />
  </CertificationStack.Navigator>
);

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <ProfileStack.Screen name="InstructorDashboardScreen" component={InstructorDashboardScreen} />
    <ProfileStack.Screen name="NotificationCenterScreen" component={NotificationCenterScreen} />
    <ProfileStack.Screen name="LanguageScreen" component={LanguageScreen} />
    <ProfileStack.Screen name="SecurityScreen" component={SecurityScreen} />
    <ProfileStack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} />
    <ProfileStack.Screen name="DataSettingsScreen" component={DataSettingsScreen} />
    <ProfileStack.Screen name="AboutScreen" component={AboutScreen} />
    <ProfileStack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
    <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} />
    <ProfileStack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
  </ProfileStack.Navigator>
);

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="CoursesTab"
        component={CourseNavigator}
        options={{
          tabBarLabel: 'Cours',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExercisesTab"
        component={ExerciseNavigator}
        options={{
          tabBarLabel: 'Exercices',
          tabBarIcon: ({ color, size }) => (
            <PenTool color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CertificationsTab"
        component={CertificationNavigator}
        options={{
          tabBarLabel: 'Certifs',
          tabBarIcon: ({ color, size }) => <Award color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityNavigator}
        options={{
          tabBarLabel: 'Communauté',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
