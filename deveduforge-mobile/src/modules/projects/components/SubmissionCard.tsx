import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CheckCircle2 } from 'lucide-react-native';
import type { ProjectSubmission } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { Card } from '../../../shared/components/ui/Card';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface SubmissionCardProps {
  submission: ProjectSubmission;
  onPress?: () => void;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission, onPress }) => {
  const formattedDate = new Date(submission.submittedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <ProjectStatusBadge status={submission.status} />
        {submission.grade != null && (
          <View style={styles.gradeBadge}>
            <CheckCircle2 size={14} color={colors.semantic.success} />
            <Text style={styles.gradeText}>{submission.grade}/100</Text>
          </View>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {submission.title}
      </Text>

      <View style={styles.metaRow}>
        <Calendar size={14} color={colors.neutral.textMuted} />
        <Text style={styles.metaText}>{formattedDate}</Text>
      </View>

      {submission.reviewerName && (
        <View style={styles.reviewerRow}>
          <Avatar name={submission.reviewerName} size={24} uri={submission.reviewerAvatar} />
          <Text style={styles.reviewerText}>
            Reviewé par {submission.reviewerName}
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.semantic.successBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  gradeText: {
    ...typography.label,
    fontSize: 11,
    color: colors.semantic.success,
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  reviewerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  reviewerText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
});
