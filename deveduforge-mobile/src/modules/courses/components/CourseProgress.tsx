import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { radius } from '../../../shared/constants/radius';

interface CourseProgressProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  barColor?: string;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  completed,
  total,
  size = 'md',
  showLabel = true,
  barColor,
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const barHeight = size === 'sm' ? 6 : 10;

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={[styles.label, size === 'sm' && styles.labelSm]}>
            {completed}/{total}
          </Text>
          <Text style={[styles.percentage, size === 'sm' && styles.percentageSm]}>
            {percentage}%
          </Text>
        </View>
      )}
      <View style={[styles.track, { height: barHeight }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              height: barHeight,
              backgroundColor: barColor || colors.brand.orange,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  labelSm: {
    fontSize: 10,
  },
  percentage: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  percentageSm: {
    fontSize: 10,
  },
  track: {
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.pill,
  },
});
