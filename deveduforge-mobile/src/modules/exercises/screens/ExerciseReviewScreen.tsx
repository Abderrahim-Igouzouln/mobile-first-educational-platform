import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';
import type { ExerciseStackParamList } from '../../../core/navigation/navigation.types';
import type { Question, Answer } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { ReviewItem } from '../components/ReviewItem';

type NavProp = NativeStackNavigationProp<ExerciseStackParamList, 'ExerciseReviewScreen'>;
type ScreenRoute = RouteProp<ExerciseStackParamList, 'ExerciseReviewScreen'>;

export const ExerciseReviewScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { result } = route.params;

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle}>Révision des réponses</Text>
        <View style={styles.backCircle} />
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>
          {result.correctAnswers}/{result.totalQuestions} bonnes réponses
        </Text>
        <Text style={[styles.scoreText, { color: result.score >= 50 ? colors.semantic.success : colors.semantic.error }]}>
          {result.score}%
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {(result.questions ?? []).map((question: Question) => {
          const answer = result.answers.find((a: Answer) => a.questionId === question.id);
          return (
            <ReviewItem
              key={question.id}
              question={question}
              answer={answer ?? { questionId: question.id, status: 'unanswered' }}
            />
          );
        })}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button variant="primary" fullWidth onPress={() => navigation.goBack()}>
          Retour aux résultats
        </Button>
      </View>
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
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  backCircle: {
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.neutral.surface,
  },
  summaryText: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  scoreText: {
    ...typography.h2,
    fontWeight: '800',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
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
  },
});
