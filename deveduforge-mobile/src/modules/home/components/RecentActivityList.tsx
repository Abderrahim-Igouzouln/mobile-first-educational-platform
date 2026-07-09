import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { ActivityItem } from '../home.types';

interface RecentActivityListProps {
  activities: ActivityItem[];
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Activité récente</Text>
      <View style={styles.list}>
        {activities.map((item, index) => (
          <View key={item.id}>
            <View style={styles.row}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.timeWrap}>
                <Clock size={12} color={colors.neutral.textMuted} />
                <Text style={styles.time}>{item.timestamp}</Text>
              </View>
            </View>
            {index < activities.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
    marginBottom: spacing.huge,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  list: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  description: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: 2,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginLeft: spacing.xxl + spacing.md,
  },
});
