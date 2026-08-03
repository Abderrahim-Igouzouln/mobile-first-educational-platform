import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Award, Lock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Badge } from '../../../shared/components/ui/display/Badge';
import { CertificateCard } from '../components/CertificateCard';
import { LockedCertificateCard } from '../components/LockedCertificateCard';
import type { CertificationStackParamList, MainTabParamList } from '../../../core/navigation/navigation.types';
import { useCertificates } from '../services/certificationService';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificationsListScreen'>;

export default function CertificationsScreen() {
  const navigation = useNavigation<NavProp>();
  const { data: certificates = [], isLoading } = useCertificates();

  const paidCerts = certificates.filter(c => c.status === 'paid');
  const lockedCerts = certificates.filter(c => c.status === 'locked' || c.status === 'unlocked');

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
          {paidCerts.length} obtenue{paidCerts.length !== 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {lockedCerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Lock size={20} color={colors.semantic.warning} />
              <Text style={styles.sectionTitle}>À débloquer</Text>
              <Badge label={`${lockedCerts.length}`} variant="warning" />
            </View>
            {lockedCerts.map((cert) => (
              <LockedCertificateCard
                key={cert.id}
                certificate={cert}
                onPress={() => {
                  if (cert.status === 'unlocked') {
                    navigation.navigate('CertificationDetailScreen', {
                      certificationId: cert.id,
                    });
                  } else {
                    navigation.getParent()?.navigate('CoursesTab', {
                      screen: 'CourseScreen',
                      params: { technologySlug: cert.technologySlug },
                    });
                  }
                }}
                onPay={() => {
                  navigation.navigate('CertificationDetailScreen', {
                    certificationId: cert.id,
                  });
                }}
              />
            ))}
            <View style={{ height: spacing.xl }} />
          </View>
        )}

        {paidCerts.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Award size={20} color={colors.semantic.success} />
              <Text style={styles.sectionTitle}>Obtenues</Text>
              <Badge label={`${paidCerts.length}`} variant="success" />
            </View>
            {paidCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onPress={() =>
                  navigation.navigate('CertificationDetailScreen', {
                    certificationId: cert.id,
                  })
                }
                onDownload={() => {
                  navigation.navigate('CertificationDetailScreen', {
                    certificationId: cert.id,
                  });
                }}
                onShare={() => {}}
                onVerify={() => {}}
              />
            ))}
          </View>
        ) : lockedCerts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune certification pour le moment</Text>
          </View>
        ) : null}

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
