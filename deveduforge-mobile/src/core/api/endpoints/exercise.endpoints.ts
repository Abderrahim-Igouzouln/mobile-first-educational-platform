import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'single_choice' | 'text';
  options?: Option[];
  order: number;
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  attemptsCount?: number;
}

export interface AnswerResult {
  questionId: string;
  isCorrect: boolean;
  correctOptionId?: string;
  explanation?: string;
}

export interface SubmitResult {
  score: number;
  total: number;
  passed: boolean;
  results: AnswerResult[];
}

export const getExercise = async (lessonId: string): Promise<Exercise> => {
  const response = await apiClient.get<ApiResponse<Exercise>>(`/exercises/lessons/${lessonId}/exercise`);
  return response.data.data;
};

export const submitAnswer = async (
  exerciseId: string,
  data: { questionId: string; selectedOptionId?: string; textAnswer?: string }
): Promise<AnswerResult> => {
  const response = await apiClient.post<ApiResponse<AnswerResult>>(`/exercises/exercises/${exerciseId}/answer`, data);
  return response.data.data;
};

export const submitExercise = async (
  exerciseId: string,
  data: { answers: Array<{ questionId: string; selectedOptionId?: string; textAnswer?: string }> }
): Promise<SubmitResult> => {
  const response = await apiClient.post<ApiResponse<SubmitResult>>(`/exercises/exercises/${exerciseId}/submit`, data);
  return response.data.data;
};
