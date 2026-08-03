import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { Badge } from '../../../shared/components/ui/display/Badge';
import { ExamWarningModal } from '../components/ExamWarningModal';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';
import type { ExamSection, ExamQuestion } from '../certifications.types';
import { useExercise } from '../../../modules/exercises/services/exerciseService';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'ExamScreen'>;
type ScreenRoute = RouteProp<CertificationStackParamList, 'ExamScreen'>;

export default function CertificationExamScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();

  const lessonId = route.params?.certificationId;
  const { data: exerciseData, isLoading } = useExercise(lessonId);

  const [showWarning, setShowWarning] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmedQuestions, setConfirmedQuestions] = useState<Set<string>>(new Set());
  const [sectionTimeLeft, setSectionTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sections = useMemo<ExamSection[]>(() => {
    if (!exerciseData) return [];
    return [{
      id: 'section-1',
      title: exerciseData.exercise.title || 'Examen',
      timeLimitMinutes: exerciseData.timeLimit ?? 30,
      questions: exerciseData.questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(o => o.text),
        correctIndex: 0,
        isAnswered: false,
      })),
    }];
  }, [exerciseData]);

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredCount = confirmedQuestions.size;

  const startExam = useCallback(() => {
    setShowWarning(false);
    setExamStarted(true);
    setSectionTimeLeft(currentSection.timeLimitMinutes * 60);
  }, [currentSection]);

  useEffect(() => {
    if (!examStarted) return;
    if (sectionTimeLeft <= 0) {
      handleSectionAutoSubmit();
      return;
    }
    timerRef.current = setInterval(() => {
      setSectionTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSectionAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, currentSectionIndex, sectionTimeLeft]);

  const handleSectionAutoSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const next = currentSectionIndex + 1;
    if (next < sections.length) {
      setCurrentSectionIndex(next);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setSectionTimeLeft(sections[next].timeLimitMinutes * 60);
    } else {
      finishExam();
    }
  };

  const handleSelectOption = (index: number) => {
    if (confirmedQuestions.has(currentQuestion.id)) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null || !currentQuestion) return;
    const updated = confirmedQuestions;
    updated.add(currentQuestion.id);
    setConfirmedQuestions(new Set(updated));

    const isLastInSection = currentQuestionIndex >= currentSection.questions.length - 1;
    const isLastSection = currentSectionIndex >= sections.length - 1;

    if (isLastInSection && isLastSection) {
      finishExam();
    } else if (isLastInSection) {
      Alert.alert(
        'Section terminée',
        'Passer à la section suivante ?',
        [
          { text: 'OK', onPress: handleSectionAutoSubmit },
        ],
      );
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    Alert.alert(
      'Soumettre l\'examen',
      'Voulez-vous vraiment soumettre votre examen ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Soumettre',
          style: 'destructive',
          onPress: () => {
            const total = sections.reduce((sum, s) => sum + s.questions.length, 0);
            const correct = sections.reduce((sum, s) => {
              return sum + s.questions.filter((q) => {
                const selected = q.selectedIndex;
                return selected !== undefined && selected === q.correctIndex;
              }).length;
            }, 0);
            const passed = correct / total >= 0.7;
            navigation.replace('CertificationResultScreen', {
              certificationId: route.params.certificationId,
              passed,
              score: correct,
              totalQuestions: total,
            });
          },
        },
      ],
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goBack = () => {
    Alert.alert(
      'Quitter',
      'Voulez-vous vraiment quitter ? Votre progression sera perdue.',
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Quitter', style: 'destructive', onPress: () => navigation.goBack() },
      ],
    );
  };

  if (isLoading) {
    return (
      <ScreenWrapper backgroundColor={colors.neutral.surface}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.navy} />
        </View>
      </ScreenWrapper>
    );
  }

  if (showWarning && sections.length > 0) {
    return (
      <ExamWarningModal
        visible={showWarning}
        durationMinutes={sections.reduce((sum, s) => sum + s.timeLimitMinutes, 0)}
        passingScore={exerciseData?.passingScore ?? 70}
        totalQuestions={totalQuestions}
        technologyName={route.params.certificationId}
        onStart={startExam}
        onClose={goBack}
      />
    );
  }

  if (!currentQuestion || !currentSection) {
    return null;
  }

  const isAnswered = confirmedQuestions.has(currentQuestion.id);

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text style={styles.sectionLabel}>
            Section {currentSectionIndex + 1} · {currentSection.title}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(answeredCount / totalQuestions) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={[styles.timer, sectionTimeLeft < 60 && styles.timerUrgent]}>
          <Clock
            size={14}
            color={sectionTimeLeft < 60 ? colors.semantic.error : colors.neutral.text}
          />
          <Text
            style={[
              styles.timerText,
              { color: sectionTimeLeft < 60 ? colors.semantic.error : colors.neutral.text },
            ]}
          >
            {formatTime(sectionTimeLeft)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.progressInfo}>
          <Badge
            label={`Question ${currentQuestionIndex + 1}/${currentSection.questions.length}`}
            variant="info"
          />
          <Text style={styles.progressCount}>
            {answeredCount}/{totalQuestions} répondue{answeredCount > 1 ? 's' : ''}
          </Text>
        </View>

        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectAnswer = index === currentQuestion.correctIndex;

            let optionBg: string = colors.neutral.surfaceAlt;
            let borderColor: string = colors.neutral.border;
            let icon = null;

            if (isAnswered) {
              if (isCorrectAnswer) {
                optionBg = colors.semantic.successBg;
                borderColor = colors.semantic.success;
                if (isSelected) icon = <CheckCircle2 size={18} color={colors.semantic.success} />;
              } else if (isSelected) {
                optionBg = colors.semantic.errorBg;
                borderColor = colors.semantic.error;
                icon = <XCircle size={18} color={colors.semantic.error} />;
              }
            } else if (isSelected) {
              optionBg = colors.semantic.infoBg;
              borderColor = colors.brand.navy;
            }

            return (
              <Pressable
                key={index}
                style={[styles.option, { backgroundColor: optionBg, borderColor }]}
                onPress={() => handleSelectOption(index)}
                disabled={isAnswered}
              >
                <Text style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                    isAnswered && isCorrectAnswer && { color: colors.semantic.success, fontWeight: '700' },
                    isAnswered && isSelected && !isCorrectAnswer && { color: colors.semantic.error },
                  ]}
                >
                  {option}
                </Text>
                {icon && <View style={styles.optionIcon}>{icon}</View>}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          variant="primary"
          fullWidth
          disabled={selectedOption === null || isAnswered}
          onPress={handleConfirm}
          icon={isAnswered ? undefined : ChevronRight}
        >
          {isAnswered ? 'Confirmé' : 'Confirmer et continuer'}
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarCenter: {
    flex: 1,
    gap: spacing.xs,
  },
  sectionLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 2,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.neutral.surfaceAlt,
  },
  timerUrgent: {
    backgroundColor: colors.semantic.errorBg,
  },
  timerText: {
    ...typography.codeBold,
    fontSize: 13,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: 120,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  progressCount: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  questionText: {
    ...typography.bodyLarge,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral.surface,
    textAlign: 'center',
    ...typography.body,
    lineHeight: 28,
    fontWeight: '700',
    color: colors.neutral.textLight,
    marginRight: spacing.md,
    overflow: 'hidden',
  },
  optionLetterSelected: {
    backgroundColor: colors.brand.navy,
    color: colors.neutral.surface,
  },
  optionText: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  optionIcon: {
    marginLeft: spacing.sm,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
