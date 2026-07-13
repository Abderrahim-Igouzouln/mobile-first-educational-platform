import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { useNetworkStatus } from '../../../../core/hooks/useNetworkStatus';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { spacing } from '../../../constants/spacing';

export const NetworkStatusBanner: React.FC = () => {
  const { isConnected } = useNetworkStatus();

  if (isConnected) return null;

  return (
    <View style={styles.banner} role="alert">
      <WifiOff size={16} color={colors.neutral.surface} />
      <Text style={styles.text}>
        Vous êtes hors-ligne · Données affichées en cache
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semantic.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  text: {
    ...typography.bodySmall,
    color: colors.neutral.surface,
    fontWeight: '600',
  },
});
