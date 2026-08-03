import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { ArrowLeft, RotateCcw, Award } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProjectReview, ProjectSubmission } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { Card } from '../../../shared/components/ui/display/Card';
import { Avatar } from '../../../shared/components/ui/display/Avatar';
import { ProjectStatusBadge } from '../components/ProjectStatusBadge';
import { useProjectReview, useProjectSubmissionQuery } from '../services/projectService';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'ProjectReviewScreen'>;
type ScreenRoute = RouteProp<CourseStackParamList, 'ProjectReviewScreen'>;

const getGradeColor = (grade: number): string => {
  if (grade >= 80) return colors.semantic.success;
  if (grade >= 60) return colors.semantic.warning;
  return colors.semantic.error;
};

export const ProjectReviewScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { projectId, submissionId } = route.params;
  const { data: review, isLoading: reviewLoading } = useProjectReview(submissionId);
  const { data: submission, isLoading: submissionLoading } = useProjectSubmissionQuery(submissionId);

  const isLoading = reviewLoading || submissionLoading;

  const gradeColor = review ? getGradeColor(review.grade) : colors.neutral.textMuted;

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.orange} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!review || !submission) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Review introuvable</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} role="button" accessibilityLabel="Retour">
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle}>Review du projet</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gradeSection}>
          <View style={[styles.gradeCircle, { borderColor: gradeColor }]}>
            <Text style={[styles.gradeNumber, { color: gradeColor }]}>
              {review.grade}
            </Text>
            <Text style={styles.gradeUnit}>/100</Text>
          </View>
          <ProjectStatusBadge status={submission.status} />
        </View>

        <Card style={styles.reviewerCard}>
          <Avatar name={review.reviewerName} size={40} />
          <View style={styles.reviewerInfo}>
            <Text style={styles.reviewerLabel}>Reviewé par</Text>
            <Text style={styles.reviewerName}>{review.reviewerName}</Text>
          </View>
          <Award size={20} color={colors.brand.orange} />
        </Card>

        <Card style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Feedback</Text>
          <Text style={styles.feedbackText}>{review.feedback}</Text>
        </Card>

        <View style={styles.scoresSection}>
          <Text style={styles.sectionTitle}>Critères d'évaluation</Text>
          {review.scoreCategories.map((cat) => {
            const percentage = (cat.score / cat.maxScore) * 100;
            const barColor = getGradeColor(percentage * 100);

            return (
              <View key={cat.name} style={styles.scoreRow}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreLabel}>{cat.label}</Text>
                  <Text style={[styles.scoreValue, { color: barColor }]}>
                    {cat.score}/{cat.maxScore}
                  </Text>
                </View>
                <View style={styles.scoreBar}>
                  <View
                    style={[
                      styles.scoreBarFill,
                      { width: `${percentage}%`, backgroundColor: barColor },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {submission.status === 'a_revoir' && (
          <Button
            variant="primary"
            icon={RotateCcw}
            fullWidth
            onPress={() => navigation.navigate('ProjectSubmissionScreen', { projectId })}
          >
            Soumettre à nouveau
          </Button>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
  },
  gradeSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  gradeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
  },
  gradeNumber: {
    ...typography.display,
    fontSize: 36,
    fontWeight: '900',
  },
  gradeUnit: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: -2,
  },
  reviewerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  reviewerName: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  feedbackCard: {
    backgroundColor: colors.neutral.surfaceAlt,
  },
  feedbackTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
  },
  feedbackText: {
    ...typography.body,
    color: colors.neutral.textLight,
    lineHeight: 22,
  },
  scoresSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  scoreRow: {
    gap: spacing.xs,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  scoreValue: {
    ...typography.bodySmall,
    fontWeight: '700',
  },
  scoreBar: {
    height: 8,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.neutral.textMuted,
  },
});
