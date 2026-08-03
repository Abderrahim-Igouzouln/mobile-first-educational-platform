import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Linking, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { Check, Download, ArrowRight, ExternalLink } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Button } from '../../../shared/components/ui/input/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { useGetInvoices } from '../services/subscriptionService';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
type ScreenRouteProp = RouteProp<ProfileStackParamList, 'PaymentSuccessScreen'>;

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { planName, startDate, nextBilling } = route.params;

  const { data: invoices } = useGetInvoices();
  const latestInvoice = invoices?.[0];

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handleStartLearning = () => {
    navigation.dispatch(CommonActions.navigate({ name: 'HomeTab' }));
  };

  const handleViewReceipt = () => {
    if (latestInvoice?.pdfUrl) {
      if (Platform.OS === 'web') {
        window.open(latestInvoice.pdfUrl, '_blank');
      } else {
        Linking.openURL(latestInvoice.pdfUrl);
      }
    }
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.checkContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.checkCircle}>
            <Check size={48} color={colors.neutral.surface} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: opacityAnim }]}>
          <Text style={styles.title}>Paiement réussi !</Text>
          <Text style={styles.subtitle}>
            Votre abonnement {planName} est maintenant actif.
          </Text>

          <Card style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Détails de l'abonnement</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Formule</Text>
              <Text style={styles.detailValue}>{planName}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date de début</Text>
              <Text style={styles.detailValue}>{startDate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Prochaine facturation</Text>
              <Text style={styles.detailValue}>{nextBilling}</Text>
            </View>
            {latestInvoice && (
              <>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Facture</Text>
                  <Text style={styles.detailValue}>{latestInvoice.number}</Text>
                </View>
              </>
            )}
          </Card>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            onPress={handleStartLearning}
          >
            Commencer l'apprentissage
          </Button>

          {latestInvoice?.pdfUrl && (
            <Button
              variant="ghost"
              size="md"
              fullWidth
              icon={latestInvoice.pdfUrl ? ExternalLink : Download}
              onPress={handleViewReceipt}
            >
              Voir la facture
            </Button>
          )}
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  checkContainer: {
    marginBottom: spacing.xxl,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.semantic.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.lg,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
  },
  detailsCard: {
    width: '100%',
  },
  detailsTitle: {
    ...typography.label,
    color: colors.neutral.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    ...typography.body,
    color: colors.neutral.textLight,
  },
  detailValue: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.border,
  },
});
