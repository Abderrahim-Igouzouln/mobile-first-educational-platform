import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { BookmarkButton } from '../components/BookmarkButton';
import { useCourse } from '../services/courseService';
import { useBookmarkToggle } from '../hooks/useBookmarks';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'LessonScreen'>;
type ScreenRoute = RouteProp<CourseStackParamList, 'LessonScreen'>;

export const LessonScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { courseId, lessonId } = route.params;

  const { data: courseData, isLoading } = useCourse(courseId);
  const { toggle, isPending } = useBookmarkToggle();

  const lesson = courseData?.lessons?.find((l) => l.id === lessonId);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!lesson) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Leçon introuvable.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={styles.backCircle}>
              <ArrowLeft
                size={20}
                color={colors.neutral.text}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text style={styles.courseLabel} numberOfLines={1}>
              {courseData?.title ?? 'Cours'}
            </Text>
          </View>
          <BookmarkButton
            isBookmarked={lesson.isBookmarked}
            onToggle={() => toggle(lesson.id)}
          />
        </View>

        <Text style={styles.title}>{lesson.title}</Text>

        <View style={styles.metaRow}>
          {lesson.duration > 0 && (
            <Text style={styles.meta}>
              {Math.ceil(lesson.duration / 60)} minutes
            </Text>
          )}
          {lesson.exercisesCount > 0 && (
            <>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.meta}>
                {lesson.exercisesCount} exercice{lesson.exercisesCount > 1 ? 's' : ''}
              </Text>
            </>
          )}
        </View>

        <View style={styles.content}>
          {lesson.content ? (
            <MarkdownRenderer content={lesson.content} />
          ) : (
            <Text style={styles.noContent}>Aucun contenu pour cette leçon.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          variant="primary"
          fullWidth
          onPress={() =>
            navigation.getParent()?.navigate('ExercisesTab', { screen: 'ExercisesScreen', params: { lessonId } })
          }
        >
          {lesson.exercisesCount > 0
            ? `Passer aux exercices (${lesson.exercisesCount})`
            : 'Passer aux exercices'}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  courseLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    flex: 1,
  },
  title: {
    ...typography.h1,
    color: colors.neutral.text,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  meta: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  metaSep: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginHorizontal: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.xl,
  },
  noContent: {
    ...typography.body,
    color: colors.neutral.textMuted,
    fontStyle: 'italic',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    ...shadows.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.semantic.error,
    textAlign: 'center',
  },
});
