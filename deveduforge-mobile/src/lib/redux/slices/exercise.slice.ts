import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizSession {
  exerciseId: string;
  answers: Record<string, string>;
  startedAt: number;
}

interface ExerciseState {
  currentSession: QuizSession | null;
  currentQuestionIndex: number;
}

const initialState: ExerciseState = {
  currentSession: null,
  currentQuestionIndex: 0,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    startSession(state, action: PayloadAction<{ exerciseId: string }>) {
      state.currentSession = {
        exerciseId: action.payload.exerciseId,
        answers: {},
        startedAt: Date.now(),
      };
      state.currentQuestionIndex = 0;
    },
    answerQuestion(
      state,
      action: PayloadAction<{ questionId: string; selectedOptionId: string }>,
    ) {
      if (state.currentSession) {
        state.currentSession.answers[action.payload.questionId] =
          action.payload.selectedOptionId;
      }
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    clearSession(state) {
      state.currentSession = null;
      state.currentQuestionIndex = 0;
    },
  },
});

export const {
  startSession,
  answerQuestion,
  setCurrentQuestionIndex,
  nextQuestion,
  previousQuestion,
  clearSession,
} = exerciseSlice.actions;
export default exerciseSlice.reducer;
