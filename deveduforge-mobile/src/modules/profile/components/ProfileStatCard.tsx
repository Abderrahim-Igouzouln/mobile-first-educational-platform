import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';

interface ProfileStatCardProps {
  value: string;
  label: string;
}

export const ProfileStatCard: React.FC<ProfileStatCardProps> = ({ value, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: spacing.sm,
  },
  value: {
    ...typography.h2,
    color: colors.brand.navy,
    marginBottom: spacing.xxs,
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    textAlign: 'center',
  },
});
