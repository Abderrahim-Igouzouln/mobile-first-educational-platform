import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import type { ExerciseStackParamList } from '../../../core/navigation/navigation.types';
import type { Answer, AnswerStatus, QuizResult } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { QuizProgressBar } from '../components/QuizProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useExercise, useSubmitAnswer } from '../services/exerciseService';

type NavProp = NativeStackNavigationProp<ExerciseStackParamList, 'QuizScreen'>;
type ScreenRoute = RouteProp<ExerciseStackParamList, 'QuizScreen'>;

export const QuizScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { exerciseId, lessonId } = route.params;

  const { data, isLoading } = useExercise(lessonId);
  const submitAnswerMutation = useSubmitAnswer();

  const questions = useMemo(() => data?.questions ?? [], [data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>();
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctOptionId, setCorrectOptionId] = useState<string | undefined>();
  const scrollRef = useRef<ScrollView>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const questionRef = useRef(currentQuestion);
  const selectedOptionRef = useRef(selectedOptionId);
  questionRef.current = currentQuestion;
  selectedOptionRef.current = selectedOptionId;

  const handleTimerExpire = useCallback(() => {
    const q = questionRef.current;
    const opt = selectedOptionRef.current;
    if (!opt) {
      setAnswers((prev) => [
        ...prev,
        {
          questionId: q.id,
          selectedOptionId: undefined,
          status: 'unanswered' as AnswerStatus,
        },
      ]);
      setShowResult(true);
      return;
    }

    submitAnswerMutation.mutate(
      {
        exerciseId,
        questionId: q.id,
        selectedOptionId: opt,
      },
      {
        onSuccess: (result) => {
          setAnswers((prev) => [
            ...prev,
            {
              questionId: q.id,
              selectedOptionId: opt,
              status: result.isCorrect ? 'correct' as AnswerStatus : 'incorrect' as AnswerStatus,
            },
          ]);
          setCorrectOptionId(result.correctOptionId);
          setShowResult(true);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { formattedTime, secondsRemaining, isExpired, start: startTimer } = useQuizTimer(
    data?.timeLimit ?? 600,
    handleTimerExpire,
  );

  useEffect(() => { startTimer(); }, [startTimer]);

  const handleSelectOption = (optionId: string) => {
    if (showResult || isExpired) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId && !isExpired) return;
    if (submitAnswerMutation.isPending) return;

    if (!selectedOptionId && isExpired) {
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          selectedOptionId: undefined,
          status: 'unanswered' as AnswerStatus,
        },
      ]);
      setShowResult(true);
      return;
    }

    submitAnswerMutation.mutate(
      {
        exerciseId,
        questionId: currentQuestion.id,
        selectedOptionId,
      },
      {
        onSuccess: (result) => {
          setAnswers((prev) => [
            ...prev,
            {
              questionId: currentQuestion.id,
              selectedOptionId,
              status: result.isCorrect ? 'correct' as AnswerStatus : 'incorrect' as AnswerStatus,
            },
          ]);
          setCorrectOptionId(result.correctOptionId);
          setShowResult(true);
        },
      },
    );
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const quizResult: QuizResult = {
        attemptId: `attempt-${Date.now()}`,
        exerciseId,
        lessonId,
        score: Math.round(
          (answers.filter((a) => a.status === 'correct').length / questions.length) * 100,
        ),
        totalQuestions: questions.length,
        correctAnswers: answers.filter((a) => a.status === 'correct').length,
        duration: (data?.timeLimit ?? 600) - secondsRemaining,
        answers: [...answers],
        questions,
      };
      navigation.replace('ExerciseResultScreen', { result: quizResult });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionId(undefined);
    setShowResult(false);
    setCorrectOptionId(undefined);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleExit = () => {
    Alert.alert(
      'Quitter le quiz',
      'Voulez-vous vraiment quitter ? Votre progression sera perdue.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Quitter', style: 'destructive', onPress: () => navigation.goBack() },
      ],
    );
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (questions.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.topBar}>
          <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color={colors.neutral.text} />
          </Pressable>
          <Text style={styles.topTitle}>Exercice</Text>
          <View style={styles.backCircle} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune question disponible.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={handleExit}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle}>Exercice</Text>
        <View style={styles.backCircle} />
      </View>

      <QuizProgressBar
        current={showResult ? currentIndex + 1 : currentIndex}
        total={questions.length}
        timeFormatted={formattedTime}
        timeRemaining={secondsRemaining}
      />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelect={handleSelectOption}
          showResult={showResult}
          correctOptionId={correctOptionId}
        />
      </ScrollView>

      <View style={styles.bottomBar}>
        {!showResult ? (
          <Button
            variant="primary"
            fullWidth
            disabled={!selectedOptionId}
            loading={submitAnswerMutation.isPending}
            onPress={handleConfirmAnswer}
            icon={ArrowRight}
          >
            Confirmer
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            onPress={handleNext}
            icon={isLastQuestion ? undefined : ArrowRight}
          >
            {isLastQuestion ? 'Voir les résultats' : 'Suivant'}
          </Button>
        )}
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
    paddingBottom: spacing.sm,
    backgroundColor: colors.neutral.surface,
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
    padding: spacing.xl,
    paddingBottom: 120,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textMuted,
  },
});
