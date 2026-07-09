import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Question, Option } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { OptionCard } from './OptionCard';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  showResult: boolean;
  correctOptionId?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelect,
  showResult,
  correctOptionId,
}) => {
  const getOptionState = (option: Option): 'default' | 'selected' | 'correct' | 'incorrect' => {
    if (!showResult) {
      return selectedOptionId === option.id ? 'selected' : 'default';
    }

    if (option.isCorrect) {
      return 'correct';
    }

    if (selectedOptionId === option.id && !option.isCorrect) {
      return 'incorrect';
    }

    return 'default';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question {question.number}</Text>
      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.optionsList}>
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            text={option.text}
            state={getOptionState(option)}
            onPress={() => onSelect(option.id)}
            disabled={showResult}
          />
        ))}
      </View>

      {showResult && question.explanation && (
        <View style={styles.explanation}>
          <Text style={styles.explanationLabel}>Explication</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  questionNumber: {
    ...typography.label,
    color: colors.brand.orange,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  questionText: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  optionsList: {
    marginBottom: spacing.sm,
  },
  explanation: {
    backgroundColor: colors.semantic.infoBg,
    borderRadius: 8,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  explanationLabel: {
    ...typography.label,
    color: colors.semantic.info,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  explanationText: {
    ...typography.body,
    color: colors.semantic.info,
  },
});
