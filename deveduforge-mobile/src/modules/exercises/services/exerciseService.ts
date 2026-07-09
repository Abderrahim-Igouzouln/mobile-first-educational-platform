import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as exerciseEndpoints from '../../../core/api/endpoints/exercise.endpoints';
import type { Exercise, Question, Option } from '../exercises.types';

const mapOption = (o: exerciseEndpoints.Option): Option => ({
  id: o.id,
  text: o.text,
  isCorrect: false,
});

const mapQuestion = (q: exerciseEndpoints.Question): Question => ({
  id: q.id,
  number: q.order,
  text: q.text,
  options: (q.options ?? []).map(mapOption),
});

const mapExercise = (e: exerciseEndpoints.Exercise): Exercise => ({
  id: e.id,
  lessonId: e.lessonId,
  title: e.title,
  number: 1,
  difficulty: 'moyen',
  questionsCount: e.questions.length,
  status: 'pending',
  bestScore: undefined,
});

export const useExercise = (lessonId: string) =>
  useQuery({
    queryKey: [...queryKeys.exercises.all, 'lesson', lessonId],
    queryFn: async () => {
      const data = await exerciseEndpoints.getExercise(lessonId);
      return {
        exercise: mapExercise(data),
        questions: data.questions.map(mapQuestion),
        timeLimit: data.timeLimit,
        passingScore: data.passingScore,
      };
    },
    enabled: !!lessonId,
  });

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      exerciseId,
      questionId,
      selectedOptionId,
      textAnswer,
    }: {
      exerciseId: string;
      questionId: string;
      selectedOptionId?: string;
      textAnswer?: string;
    }) => exerciseEndpoints.submitAnswer(exerciseId, { questionId, selectedOptionId, textAnswer }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.exercises.all });
    },
  });
};

export const useSubmitExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      exerciseId,
      answers,
    }: {
      exerciseId: string;
      answers: Array<{ questionId: string; selectedOptionId?: string; textAnswer?: string }>;
    }) => exerciseEndpoints.submitExercise(exerciseId, { answers }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.exercises.all });
    },
  });
};
