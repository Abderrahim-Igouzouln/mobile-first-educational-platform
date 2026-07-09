import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CourseState {
  lastVisitedDomain: string | null;
  lastVisitedTechnology: string | null;
}

const initialState: CourseState = {
  lastVisitedDomain: null,
  lastVisitedTechnology: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setLastVisitedDomain(state, action: PayloadAction<string>) {
      state.lastVisitedDomain = action.payload;
    },
    setLastVisitedTechnology(state, action: PayloadAction<string>) {
      state.lastVisitedTechnology = action.payload;
    },
    clearCourseHistory(state) {
      state.lastVisitedDomain = null;
      state.lastVisitedTechnology = null;
    },
  },
});

export const { setLastVisitedDomain, setLastVisitedTechnology, clearCourseHistory } =
  courseSlice.actions;
export default courseSlice.reducer;
