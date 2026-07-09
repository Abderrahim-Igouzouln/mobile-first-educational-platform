import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, BookOpen } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { TabOption } from '../courses.types';

interface CourseHeaderProps {
  domainName?: string;
  domainColor?: string;
  courseTitle: string;
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (key: string) => void;
  onBack?: () => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  domainName,
  domainColor,
  courseTitle,
  tabs,
  activeTab,
  onTabChange,
  onBack,
}) => {
  const gradientColors: [string, string] = domainColor
    ? [domainColor, domainColor + '80']
    : [colors.brand.navy, colors.brand.navyLight];

  return (
    <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
        {onBack && (
          <Pressable style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>
        )}

        {domainName && (
          <View style={styles.domainTag}>
            <BookOpen size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.domainTagText}>{domainName}</Text>
          </View>
        )}

        <Text style={styles.title} numberOfLines={2}>
          {courseTitle}
        </Text>

        <View style={styles.tabRow}>
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => onTabChange(tab.key)}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.huge,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  domainTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  domainTagText: {
    ...typography.label,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  title: {
    ...typography.h1,
    color: '#FFFFFF',
    marginBottom: spacing.xl,
  },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  tabText: {
    ...typography.label,
    color: 'rgba(255,255,255,0.6)',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
