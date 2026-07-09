import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRight, Award, Code2, FileJson, Terminal, Smartphone, Container, Cloud } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';
import { useCertificates } from '../services/certificationService';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileJson, Terminal, Smartphone, Container, Cloud,
};

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificationsListScreen'>;

export default function CertificationsScreen() {
  const navigation = useNavigation<NavProp>();
  const { data: certificates = [], isLoading } = useCertificates();

  if (isLoading) {
    return (
      <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.navy} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <LinearGradient
        colors={[colors.brand.navy, colors.brand.navyLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Mes Certifications</Text>
        <Text style={styles.headerCount}>
          {certificates.length} obtenue{certificates.length !== 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {certificates.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Award size={20} color={colors.semantic.success} />
              <Text style={styles.sectionTitle}>Obtenues</Text>
              <Badge label={`${certificates.length}`} variant="success" />
            </View>

            {certificates.map((cert) => (
              <Card
                key={cert.id}
                style={styles.earnedCard}
                onPress={() =>
                  navigation.navigate('CertificationDetailScreen', {
                    certificationId: cert.id,
                  })
                }
              >
                <View style={styles.earnedCardTop}>
                  <View style={styles.earnedIconWrap}>
                    {(() => {
                      const TechIcon = ICON_MAP[cert.technologyIcon];
                      return TechIcon ? <TechIcon color={cert.domainColor || colors.brand.navy} size={22} /> : null;
                    })()}
                  </View>
                  <View style={styles.earnedInfo}>
                    <Text style={styles.earnedTechName}>{cert.technologyName}</Text>
                    <Text style={styles.earnedDate}>{cert.issueDate}</Text>
                  </View>
                  <ChevronRight size={20} color={colors.neutral.textMuted} />
                </View>

                <View style={styles.earnedMeta}>
                  <View style={styles.earnedMetaItem}>
                    <Text style={styles.earnedMetaLabel}>Score</Text>
                    <Text style={[styles.earnedMetaValue, { color: colors.semantic.success }]}>
                      {cert.totalQuestions > 0
                        ? `${Math.round((cert.score / cert.totalQuestions) * 100)}%`
                        : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.earnedMetaItem}>
                    <Text style={styles.earnedMetaLabel}>Niveau</Text>
                    <Text style={styles.earnedMetaValue}>{cert.level}</Text>
                  </View>
                  <View style={styles.earnedMetaItem}>
                    <Text style={styles.earnedMetaLabel}>N°</Text>
                    <Text style={styles.earnedMetaValue} numberOfLines={1}>
                      {cert.certificateNumber.slice(-6)}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune certification obtenue pour le moment</Text>
          </View>
        )}

        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  headerTitle: {
    ...typography.display,
    color: colors.neutral.surface,
  },
  headerCount: {
    ...typography.body,
    color: colors.neutral.surface,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    flex: 1,
  },
  earnedCard: {
    marginBottom: spacing.md,
  },
  earnedCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  earnedIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedInfo: {
    flex: 1,
  },
  earnedTechName: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  earnedDate: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: spacing.xxs,
  },
  earnedMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  earnedMetaItem: {
    flex: 1,
    alignItems: 'center',
  },
  earnedMetaLabel: {
    ...typography.label,
    color: colors.neutral.textMuted,
    marginBottom: spacing.xxs,
  },
  earnedMetaValue: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
  },
});
