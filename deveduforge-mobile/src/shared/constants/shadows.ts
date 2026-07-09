import { Platform, ViewStyle } from 'react-native';

export const shadows: Record<string, ViewStyle> = {
  sm: Platform.select<ViewStyle>({
    android: { elevation: 2 },
    default: { boxShadow: '0 2px 6px rgba(0, 32, 91, 0.08)' },
  })!,
  md: Platform.select<ViewStyle>({
    android: { elevation: 5 },
    default: { boxShadow: '0 4px 12px rgba(0, 32, 91, 0.1)' },
  })!,
};
