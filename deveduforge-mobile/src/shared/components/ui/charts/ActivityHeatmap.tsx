import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing } from '../../../constants/spacing';

export interface ActivityDay {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: ActivityDay[];
  weeks?: number;
}

const LEVELS = [0, 1, 3, 5, 8];

export function ActivityHeatmap({ data, weeks = 12 }: ActivityHeatmapProps) {
  const { colors, typography } = useTheme();

  const levelColors = useMemo(() => [
    colors.neutral.surfaceAlt,
    `${colors.brand.orange}30`,
    `${colors.brand.orange}55`,
    `${colors.brand.orange}80`,
    colors.brand.orange,
  ], [colors]);

  const getLevel = (count: number): number => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (count >= LEVELS[i]) return i;
    }
    return 0;
  };

  const cells = useMemo(() => {
    const today = new Date();
    return Array.from({ length: weeks * 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (weeks * 7 - 1 - i));
      const isoDate = date.toISOString().split('T')[0];
      const found = data.find(d => d.date === isoDate);
      return { date: isoDate, count: found?.count ?? 0 };
    });
  }, [data, weeks]);

  if (data.length === 0) return null;

  return (
    <View>
      <Text style={[typography.bodySmall, { color: colors.neutral.textLight, marginBottom: spacing.sm }]}>
        Activité des {weeks} dernières semaines
      </Text>
      <View style={styles.grid}>
        {cells.map((cell) => (
          <View
            key={cell.date}
            style={[
              styles.cell,
              { backgroundColor: levelColors[getLevel(cell.count)] },
            ]}
          />
        ))}
      </View>
      <View style={styles.legend}>
        <Text style={[typography.bodySmall, { color: colors.neutral.textMuted }]}>Moins</Text>
        {levelColors.map((color, i) => (
          <View key={i} style={[styles.cell, { backgroundColor: color }]} />
        ))}
        <Text style={[typography.bodySmall, { color: colors.neutral.textMuted }]}>Plus</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
});
