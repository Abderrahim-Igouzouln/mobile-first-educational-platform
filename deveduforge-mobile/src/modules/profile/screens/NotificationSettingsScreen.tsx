import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import type { NotificationSetting } from '../profile.types';

const NOTIFICATIONS: NotificationSetting[] = [
  { id: '1', label: 'Rappels de cours', key: 'lesson_reminders', enabled: true },
  { id: '2', label: 'Nouveaux cours', key: 'new_courses', enabled: true },
  { id: '3', label: "Résultats d'exercices", key: 'exercise_results', enabled: true },
  { id: '4', label: 'Offres et promotions', key: 'offers', enabled: false },
  { id: '5', label: 'Rappels de streak', key: 'streak_reminders', enabled: true },
  { id: '6', label: 'Nouveaux certificats', key: 'new_certificates', enabled: true },
];

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState(NOTIFICATIONS);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Gérez les notifications que vous souhaitez recevoir.
        </Text>
        <Card style={styles.card}>
          {settings.map((item, index) => (
            <React.Fragment key={item.id}>
              <View style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggle(item.id)}
                  trackColor={{ false: colors.neutral.borderDark, true: colors.brand.orange }}
                  thumbColor={colors.neutral.surface}
                  ios_backgroundColor={colors.neutral.borderDark}
                />
              </View>
              {index < settings.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </Card>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  card: {
    padding: 0,
    paddingVertical: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  label: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
    marginRight: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.lg,
  },
});
