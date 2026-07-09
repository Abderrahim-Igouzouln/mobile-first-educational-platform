import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import courseReducer from './slices/course.slice';
import exerciseReducer from './slices/exercise.slice';
import certificationReducer from './slices/certification.slice';
import offlineReducer from './slices/offline.slice';
import uiReducer from './slices/ui.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  exercise: exerciseReducer,
  certification: certificationReducer,
  offline: offlineReducer,
  ui: uiReducer,
});

export default rootReducer;
