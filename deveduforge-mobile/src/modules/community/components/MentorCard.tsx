import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Star, Video } from 'lucide-react-native';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { Mentor } from '../community.types';

interface MentorCardProps {
  mentor: Mentor;
  onPress: () => void;
  onBook: (mentorId: string) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, onPress, onBook }) => {
  const renderStars = () => {
    const full = Math.floor(mentor.rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          color={i < full ? colors.brand.orange : colors.neutral.borderDark}
          fill={i < full ? colors.brand.orange : 'transparent'}
        />,
      );
    }
    return stars;
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      role="button"
    >
      <View style={styles.topSection}>
        <Avatar name={mentor.name} size={52} uri={mentor.avatar} />
        <View style={styles.topInfo}>
          <Text style={styles.name} numberOfLines={1}>{mentor.name}</Text>
          <Text style={styles.title} numberOfLines={1}>{mentor.title}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>{renderStars()}</View>
            <Text style={styles.ratingText}>{mentor.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.expertiseRow}>
        {(mentor.expertise ?? []).slice(0, 3).map((skill) => (
          <View key={skill} style={styles.expertiseTag}>
            <Text style={styles.expertiseText}>{skill}</Text>
          </View>
        ))}
        {(mentor.expertise ?? []).length > 3 && (
          <View style={styles.expertiseTag}>
            <Text style={styles.expertiseText}>+{mentor.expertise.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Video size={14} color={colors.neutral.textMuted} />
          <Text style={styles.statText}>{mentor.sessionCount} sessions</Text>
        </View>
        <Text style={styles.price}>{mentor.pricePerSession} €/h</Text>
      </View>

      <Pressable
        style={styles.bookButton}
        onPress={(e: any) => { e?.stopPropagation?.(); onBook(mentor.id); }}
        accessibilityLabel={`Réserver une session avec ${mentor.name}`}
      >
        <Text style={styles.bookText}>Réserver</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  topInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  name: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  title: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontWeight: '600',
    fontSize: 11,
  },
  expertiseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  expertiseTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.semantic.infoBg,
  },
  expertiseText: {
    ...typography.bodySmall,
    fontSize: 11,
    color: colors.semantic.info,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  price: {
    ...typography.h3,
    color: colors.brand.orange,
  },
  bookButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.brand.orange,
    alignItems: 'center',
  },
  bookText: {
    ...typography.button,
    color: colors.neutral.surface,
  },
});
