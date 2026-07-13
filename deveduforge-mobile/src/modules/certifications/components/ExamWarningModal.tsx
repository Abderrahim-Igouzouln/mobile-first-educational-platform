import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Modal as RNModal } from 'react-native';
import { AlertTriangle, Clock, Target, ListChecks } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { Button } from '../../../shared/components/ui/input/Button';

interface ExamWarningModalProps {
  visible: boolean;
  durationMinutes: number;
  passingScore: number;
  totalQuestions: number;
  technologyName: string;
  onStart: () => void;
  onClose: () => void;
}

export const ExamWarningModal: React.FC<ExamWarningModalProps> = ({
  visible,
  durationMinutes,
  passingScore,
  totalQuestions,
  technologyName,
  onStart,
  onClose,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.iconWrap}>
            <AlertTriangle size={32} color={colors.brand.orange} />
          </View>

          <Text style={styles.title}>Examen de certification</Text>
          <Text style={styles.subtitle}>{technologyName}</Text>

          <View style={styles.rulesContainer}>
            <View style={styles.ruleRow}>
              <Clock size={20} color={colors.brand.navy} />
              <Text style={styles.ruleText}>
                Durée: <Text style={styles.ruleBold}>{durationMinutes} minutes</Text>
              </Text>
            </View>
            <View style={styles.ruleRow}>
              <Target size={20} color={colors.brand.navy} />
              <Text style={styles.ruleText}>
                Note de passage: <Text style={styles.ruleBold}>{passingScore}%</Text>
              </Text>
            </View>
            <View style={styles.ruleRow}>
              <ListChecks size={20} color={colors.brand.navy} />
              <Text style={styles.ruleText}>
                <Text style={styles.ruleBold}>{totalQuestions} questions</Text> réparties en sections
              </Text>
            </View>
          </View>

          <View style={styles.rulesBox}>
            <Text style={styles.rulesTitle}>Règles:</Text>
            <Text style={styles.ruleItem}>• Vous ne pouvez pas revenir à une question précédente</Text>
            <Text style={styles.ruleItem}>• Chaque section a un temps limite</Text>
            <Text style={styles.ruleItem}>• Une fois le temps écoulé, la section est soumise automatiquement</Text>
            <Text style={styles.ruleItem}>• La triche entraîne l'annulation de la certification</Text>
          </View>

          <View style={styles.actions}>
            <Button variant="outline" fullWidth onPress={onClose}>
              Annuler
            </Button>
            <View style={styles.actionSpacer} />
            <Button variant="primary" fullWidth onPress={onStart}>
              Commencer l'examen
            </Button>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.neutral.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  sheet: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    maxHeight: '90%',
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.semantic.warningBg,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.neutral.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  rulesContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
  },
  ruleText: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
  },
  ruleBold: {
    fontWeight: '700',
  },
  rulesBox: {
    backgroundColor: colors.semantic.warningBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  rulesTitle: {
    ...typography.h3,
    color: colors.semantic.warning,
    marginBottom: spacing.sm,
  },
  ruleItem: {
    ...typography.bodySmall,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
  },
  actionSpacer: {
    width: spacing.md,
  },
});
