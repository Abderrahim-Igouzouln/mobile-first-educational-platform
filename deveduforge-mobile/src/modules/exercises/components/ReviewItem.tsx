import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react-native';
import type { Question, Answer, Option } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

interface ReviewItemProps {
  question: Question;
  answer: Answer;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const isCorrect = answer.status === 'correct';
  const selectedOption = question.options.find((o) => o.id === answer.selectedOptionId);
  const correctOption = question.options.find((o) => o.isCorrect);

  return (
    <Pressable
      style={styles.container}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isCorrect ? (
            <CheckCircle2 size={20} color={colors.semantic.success} />
          ) : (
            <XCircle size={20} color={colors.semantic.error} />
          )}
          <Text style={styles.questionNumber} numberOfLines={1}>
            Question {question.number}
          </Text>
        </View>
        {expanded ? (
          <ChevronUp size={18} color={colors.neutral.textMuted} />
        ) : (
          <ChevronDown size={18} color={colors.neutral.textMuted} />
        )}
      </View>

      {expanded && (
        <View style={styles.body}>
          <Text style={styles.questionText}>{question.text}</Text>

          <View style={styles.answersRow}>
            <View style={styles.answerColumn}>
              <Text style={styles.answerLabel}>Votre réponse</Text>
              <Text
                style={[
                  styles.answerText,
                  { color: isCorrect ? colors.semantic.success : colors.semantic.error },
                ]}
              >
                {selectedOption?.text ?? 'Pas de réponse'}
              </Text>
            </View>

            {!isCorrect && (
              <View style={styles.answerColumn}>
                <Text style={styles.answerLabel}>Bonne réponse</Text>
                <Text style={[styles.answerText, { color: colors.semantic.success }]}>
                  {correctOption?.text ?? ''}
                </Text>
              </View>
            )}
          </View>

          {question.explanation && (
            <View style={styles.explanation}>
              <Text style={styles.explanationLabel}>Explication</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.xl,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  questionNumber: {
    ...typography.body,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    paddingTop: spacing.md,
  },
  questionText: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  answersRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  answerColumn: {
    flex: 1,
  },
  answerLabel: {
    ...typography.label,
    color: colors.neutral.textMuted,
    marginBottom: spacing.xxs,
    textTransform: 'uppercase',
  },
  answerText: {
    ...typography.body,
    fontWeight: '600',
  },
  explanation: {
    backgroundColor: colors.semantic.infoBg,
    borderRadius: 8,
    padding: spacing.md,
  },
  explanationLabel: {
    ...typography.label,
    color: colors.semantic.info,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  explanationText: {
    ...typography.bodySmall,
    color: colors.semantic.info,
  },
});
