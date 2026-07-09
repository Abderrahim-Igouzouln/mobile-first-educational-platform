import { useAppSelector } from '../../lib/redux/hooks/useAppSelector';
import { theme as lightTheme } from '../constants/theme';
import { colors as lightColors } from '../constants/colors';

const darkColors = {
  ...lightColors,
  dark: lightColors.dark,
  neutral: {
    text: '#F0F2F5',
    textLight: '#A8AFBD',
    textMuted: '#6B7280',
    border: '#26304A',
    borderDark: '#374151',
    surface: '#141C2E',
    surfaceAlt: '#1F2937',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

const darkTheme = {
  ...lightTheme,
  colors: darkColors,
};

export const useTheme = () => {
  const themeMode = useAppSelector((state) => state.ui.theme);
  return themeMode === 'dark' ? darkTheme : lightTheme;
};

export type AppTheme = ReturnType<typeof useTheme>;
