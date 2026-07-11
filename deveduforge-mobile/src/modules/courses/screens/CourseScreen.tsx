import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowRight, PenTool, FolderKanban } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { CourseHeader } from '../components/CourseHeader';
import { LessonItem } from '../components/LessonItem';
import { CourseProgress } from '../components/CourseProgress';
import { useCourseDetailByTech } from '../services/courseService';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { useProjects } from '../../projects/services/projectService';
import type { Lesson, TabOption } from '../courses.types';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'CourseScreen'>;
type ScreenRoute = RouteProp<CourseStackParamList, 'CourseScreen'>;

const TABS: TabOption[] = [
  { key: 'lectures', label: 'Lecture' },
  { key: 'exercices', label: 'Exercices' },
  { key: 'projets', label: 'Projets' },
];

export const CourseScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { technologySlug } = route.params;

  const { data: courseData, isLoading, isError } = useCourseDetailByTech(technologySlug);
  const [activeTab, setActiveTab] = useState('lectures');

  const course = courseData
    ? { ...courseData, lessons: courseData.lessons ?? [] }
    : undefined;
  const lessons = course?.lessons ?? [];
  const progress = useCourseProgress(course, lessons);

  const { data: projects = [] } = useProjects(course?.id);

  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.status === 'locked') return;
    if (!course?.id) return;
    navigation.navigate('LessonScreen', { courseId: course.id, lessonId: lesson.id });
  };

  const handleStartExercise = (lessonId: string) => {
    navigation.getParent()?.navigate('ExercisesTab', { screen: 'ExercisesScreen', params: { lessonId } });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError || !course) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Impossible de charger le cours.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <CourseHeader
        domainName={course.domainName}
        domainColor={course.domainColor}
        courseTitle={course.title}
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => navigation.goBack()}
      />

      {activeTab === 'lectures' && (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.progressSection}>
              <Text style={styles.sectionTitle}>Progression</Text>
              <CourseProgress
                completed={course.completedLessonsCount}
                total={course.lessonsCount}
                size="md"
                showLabel
              />
              {progress && (
                <Text style={styles.remainingText}>
                  {progress.remainingLessons > 0
                    ? `Il vous reste ${progress.remainingLessons} leçon${progress.remainingLessons > 1 ? 's' : ''}`
                    : 'Félicitations ! Vous avez terminé toutes les leçons.'}
                </Text>
              )}
            </View>
          }
          renderItem={({ item, index }) => (
            <LessonItem
              lesson={item}
              index={index}
              onPress={() => handleLessonPress(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>Aucune leçon disponible.</Text>
            </View>
          }
        />
      )}

      {activeTab === 'exercices' && (
        <FlatList
          data={lessons.filter((l) => l.exercisesCount > 0)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.progressSection}>
              <Text style={styles.sectionTitle}>Exercices disponibles</Text>
              <Text style={styles.remainingText}>
                {lessons.filter((l) => l.exercisesCount > 0).length} leçons avec exercices
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.exerciseCard}
              onPress={() => handleStartExercise(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.exerciseCardLeft}>
                <View style={styles.exerciseIcon}>
                  <PenTool size={20} color={colors.brand.orange} />
                </View>
                <View style={styles.exerciseCardInfo}>
                  <Text style={styles.exerciseCardTitle}>{item.title}</Text>
                  <Text style={styles.exerciseCardMeta}>
                    {item.exercisesCount} exercice{item.exercisesCount > 1 ? 's' : ''}
                    {item.isCompleted ? ' · Terminé' : ''}
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={colors.neutral.textLight} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <PenTool size={48} color={colors.neutral.textMuted} />
              <Text style={styles.emptyText}>Aucun exercice disponible.</Text>
            </View>
          }
        />
      )}

      {activeTab === 'projets' && (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.progressSection}>
              <Text style={styles.sectionTitle}>Projets du cours</Text>
              <Text style={styles.remainingText}>
                {projects.length} projet{projects.length > 1 ? 's' : ''} — Soumettez votre travail pour recevoir un feedback
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.exerciseCard}
              onPress={() =>
                navigation.navigate('ProjectDetailScreen', { projectId: item.id })
              }
              activeOpacity={0.7}
            >
              <View style={styles.exerciseCardLeft}>
                <View style={styles.exerciseIcon}>
                  <FolderKanban size={20} color={colors.brand.orange} />
                </View>
                <View style={styles.exerciseCardInfo}>
                  <Text style={styles.exerciseCardTitle}>{item.title}</Text>
                  <Text style={styles.exerciseCardMeta}>
                    Difficulté : {item.difficulty} · {item.duration}
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={colors.neutral.textLight} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <FolderKanban size={48} color={colors.neutral.textMuted} />
              <Text style={styles.emptyText}>Aucun projet pour ce cours.</Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.huge,
  },
  progressSection: {
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
  },
  remainingText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: spacing.sm,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  exerciseCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  exerciseCardInfo: {
    flex: 1,
  },
  exerciseCardTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  exerciseCardMeta: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: 2,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.semantic.error,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textMuted,
    textAlign: 'center',
  },
});
