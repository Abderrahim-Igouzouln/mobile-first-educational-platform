export interface QuestionResponse {
  id: string;
  type: string;
  prompt: string;
  order: number;
  points: number;
  options: AnswerOptionResponse[];
}

export interface AnswerOptionResponse {
  id: string;
  label: string;
  order: number;
}

export interface ExerciseDetailResponse {
  id: string;
  title: string;
  passingScorePercent: number;
  questions: QuestionResponse[];
}

export interface ExerciseResultResponse {
  exerciseId: string;
  passed: boolean;
  scorePercent: number;
  attemptNumber: number;
  questionsResults: Array<{
    questionId: string;
    isCorrect: boolean;
    pointsEarned: number;
  }>;
}
