import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Download, Trash2 } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Button } from '../../../shared/components/ui/input/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';

export default function DataSettingsScreen() {
  const cacheSize = '~2.1 Mo';

  const handleClearCache = () => {
    Alert.alert(
      'Vider le cache',
      'Les données téléchargées hors-ligne seront conservées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Vider', style: 'destructive', onPress: () => Alert.alert('Succès', 'Le cache a été vidé avec succès.') },
      ],
    );
  };

  const handleDownloadData = () => {
    Alert.alert('Téléchargement', 'Vos données seront bientôt disponibles au téléchargement.');
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite}>
      <View style={styles.container}>
        <Card style={styles.storageCard}>
          <Text style={styles.storageTitle}>Stockage utilisé</Text>
          <View style={styles.storageBar}>
            <View style={styles.storageFill} />
          </View>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Cache</Text>
            <Text style={styles.storageValue}>{cacheSize}</Text>
          </View>
        </Card>

        <View style={styles.buttonGroup}>
          <Button
            variant="outline"
            icon={Download}
            fullWidth
            onPress={handleDownloadData}
          >
            Télécharger mes données
          </Button>
          <Button
            variant="outline"
            icon={Trash2}
            fullWidth
            onPress={handleClearCache}
          >
            Vider le cache
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  storageCard: {
    marginBottom: spacing.xxl,
  },
  storageTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  storageBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.neutral.surfaceAlt,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  storageFill: {
    width: '15%',
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 3,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  storageValue: {
    ...typography.bodySmall,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  buttonGroup: {
    gap: spacing.md,
  },
});
