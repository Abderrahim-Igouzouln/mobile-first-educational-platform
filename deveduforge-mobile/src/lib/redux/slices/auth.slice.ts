import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../core/auth/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  biometricEnabled: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  biometricEnabled: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; isAuthenticated?: boolean }>) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated ?? true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setBiometricEnabled(state, action: PayloadAction<boolean>) {
      state.biometricEnabled = action.payload;
    },
  },
});

export const { setCredentials, logout, setBiometricEnabled } = authSlice.actions;
export default authSlice.reducer;
