import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';
type Locale = 'fr' | 'ar' | 'en';

interface BannerState {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  visible: boolean;
}

interface UiState {
  theme: Theme;
  locale: Locale;
  banner: BannerState;
}

const initialState: UiState = {
  theme: 'light',
  locale: 'fr',
  banner: {
    message: '',
    type: 'info',
    visible: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    showBanner(
      state,
      action: PayloadAction<{ message: string; type?: BannerState['type'] }>,
    ) {
      state.banner.message = action.payload.message;
      state.banner.type = action.payload.type ?? 'info';
      state.banner.visible = true;
    },
    hideBanner(state) {
      state.banner.visible = false;
    },
  },
});

export const { setTheme, setLocale, showBanner, hideBanner } = uiSlice.actions;
export default uiSlice.reducer;
