import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { CourseHeader } from '../components/CourseHeader';
import { LessonItem } from '../components/LessonItem';
import { CourseProgress } from '../components/CourseProgress';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useCourse } from '../services/courseService';
import { useCourseProgress } from '../hooks/useCourseProgress';
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

  const { data: courseData, isLoading, isError } = useCourse(technologySlug);
  const [activeTab, setActiveTab] = useState('lectures');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const course = courseData
    ? { ...courseData, lessons: courseData.lessons ?? [] }
    : undefined;
  const lessons = course?.lessons ?? [];
  const progress = useCourseProgress(course, lessons);

  const activeLesson = activeLessonId
    ? lessons.find((l) => l.id === activeLessonId)
    : undefined;

  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.status === 'locked') return;
    setActiveLessonId(activeLessonId === lesson.id ? null : lesson.id);
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
        ListFooterComponent={
          activeLesson ? (
            <View style={styles.lessonContent}>
              <Text style={styles.lessonContentTitle}>{activeLesson.title}</Text>
              {activeLesson.content ? (
                <MarkdownRenderer content={activeLesson.content} />
              ) : (
                <Text style={styles.noContent}>Aucun contenu disponible.</Text>
              )}
            </View>
          ) : null
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
  lessonContent: {
    padding: spacing.xl,
  },
  lessonContentTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  noContent: {
    ...typography.body,
    color: colors.neutral.textMuted,
    fontStyle: 'italic',
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
