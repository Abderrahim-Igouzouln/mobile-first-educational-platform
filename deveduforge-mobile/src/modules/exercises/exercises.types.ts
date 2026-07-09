export type DifficultyLevel = 'facile' | 'moyen' | 'difficile';
export type ExerciseStatus = 'pending' | 'passed' | 'failed';
export type AnswerStatus = 'correct' | 'incorrect' | 'unanswered';

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  number: number;
  difficulty: DifficultyLevel;
  questionsCount: number;
  status: ExerciseStatus;
  bestScore?: number;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  number: number;
  text: string;
  options: Option[];
  explanation?: string;
}

export interface Answer {
  questionId: string;
  selectedOptionId?: string;
  status: AnswerStatus;
  timeSpent?: number;
}

export interface QuizAttempt {
  id: string;
  exerciseId: string;
  lessonId: string;
  startedAt: string;
  completedAt?: string;
  duration: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  status: ExerciseStatus;
  answers: Answer[];
}

export interface QuizResult {
  attemptId: string;
  exerciseId: string;
  lessonId: string;
  lessonTitle?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  answers: Answer[];
  questions: Question[];
}

export interface DifficultyBreakdown {
  level: DifficultyLevel;
  total: number;
  correct: number;
}
