import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react-native';
import type { ExerciseStackParamList } from '../../../core/navigation/navigation.types';
import type { DifficultyLevel, Question, Answer } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { ResultCircle } from '../components/ResultCircle';
import { ResultStatsRow } from '../components/ResultStatsRow';

type NavProp = NativeStackNavigationProp<ExerciseStackParamList, 'ExerciseResultScreen'>;
type ScreenRoute = RouteProp<ExerciseStackParamList, 'ExerciseResultScreen'>;

const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile',
};

export const ExerciseResultScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { result } = route.params;

  const getScoreColor = () => {
    if (result.score >= 80) return colors.semantic.success;
    if (result.score >= 50) return colors.semantic.warning;
    return colors.semantic.error;
  };

  const handleReview = () => {
    navigation.navigate('ExerciseReviewScreen', { result });
  };

  const handleRetry = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.getParent()?.goBack();
  };

  const difficultyBreakdown: { level: DifficultyLevel; total: number; correct: number }[] = [
    { level: 'facile', total: 0, correct: 0 },
    { level: 'moyen', total: 0, correct: 0 },
    { level: 'difficile', total: 0, correct: 0 },
  ];

  result.questions.forEach((q: Question) => {
    const answer = result.answers.find((a: Answer) => a.questionId === q.id);
    const difficulty: DifficultyLevel = q.number <= 2 ? 'facile' : q.number <= 4 ? 'moyen' : 'difficile';
    const entry = difficultyBreakdown.find((d) => d.level === difficulty);
    if (entry) {
      entry.total++;
      if (answer?.status === 'correct') {
        entry.correct++;
      }
    }
  });

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle}>Résultats</Text>
        <View style={styles.backCircle} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.circleSection}>
          <ResultCircle percentage={result.score} size={160} strokeWidth={12} />
        </View>

        <Text style={[styles.statusText, { color: getScoreColor() }]}>
          {result.score >= 80
            ? 'Excellent !'
            : result.score >= 50
              ? 'Pas mal !'
              : 'Peut mieux faire'}
        </Text>

        <Text style={styles.subtitle}>
          {result.correctAnswers} / {result.totalQuestions} bonnes réponses
        </Text>

        <View style={styles.divider} />

        <ResultStatsRow
          totalQuestions={result.totalQuestions}
          correctAnswers={result.correctAnswers}
          duration={result.duration}
          score={result.score}
        />

        <View style={styles.breakdownSection}>
          <Text style={styles.breakdownTitle}>Par difficulté</Text>
          {difficultyBreakdown.map((item) => (
            <View key={item.level} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{LEVEL_LABELS[item.level]}</Text>
              <View style={styles.breakdownBar}>
                <View
                  style={[
                    styles.breakdownFill,
                    {
                      width: item.total > 0 ? `${(item.correct / item.total) * 100}%` : '0%',
                      backgroundColor:
                        item.total === 0
                          ? colors.neutral.border
                          : item.correct / item.total >= 0.8
                            ? colors.semantic.success
                            : item.correct / item.total >= 0.5
                              ? colors.semantic.warning
                              : colors.semantic.error,
                    },
                  ]}
                />
              </View>
              <Text style={styles.breakdownValue}>
                {item.correct}/{item.total}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBtn}>
          <Button variant="outline" onPress={handleReview} fullWidth>
            Revoir les réponses
          </Button>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.halfBtn}>
            <Button variant="secondary" onPress={handleRetry} icon={RotateCcw} fullWidth>
              Refaire
            </Button>
          </View>
          <View style={styles.halfBtn}>
            <Button variant="primary" onPress={handleContinue} icon={Home} fullWidth>
              Continuer
            </Button>
          </View>
        </View>
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
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  circleSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  statusText: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  breakdownSection: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  breakdownTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  breakdownLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    width: 70,
    fontWeight: '600',
  },
  breakdownBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.pill,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    borderRadius: radius.pill,
  },
  breakdownValue: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    width: 36,
    textAlign: 'right',
    fontWeight: '600',
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
    gap: spacing.sm,
  },
  bottomBtn: {
    marginBottom: spacing.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfBtn: {
    flex: 1,
  },
});
