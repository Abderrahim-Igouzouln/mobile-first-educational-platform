import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Download, Trash2, HardDrive, ChevronRight } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { useAllDownloads, useStorageUsage, downloadManager } from '../services/downloadService';
import type { DownloadState } from '../courses.types';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'OfflineCoursesScreen'>;

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 o';
  const k = 1024;
  const sizes = ['o', 'Ko', 'Mo', 'Go'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  return `${value} ${sizes[i]}`;
};

export const OfflineCoursesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const downloads = useAllDownloads();
  const usage = useStorageUsage();

  const completedDownloads = downloads.filter((d) => d.status === 'completed');

  const handleDeleteCourse = useCallback((courseId: string, courseName: string) => {
    Alert.alert(
      'Supprimer le cours',
      `Voulez-vous vraiment supprimer "${courseName}" de vos téléchargements ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => downloadManager.removeDownload(courseId),
        },
      ],
    );
  }, []);

  const renderDownloadItem = ({ item }: { item: DownloadState }) => (
    <View style={styles.downloadCard}>
      <View style={styles.downloadIcon}>
        <Download size={20} color={colors.brand.navy} />
      </View>
      <View style={styles.downloadInfo}>
        <Text style={styles.downloadName}>{item.courseId}</Text>
        <View style={styles.downloadMeta}>
          <Text style={styles.downloadSize}>
            {formatBytes(item.totalSize)}
          </Text>
          <View
            style={[
              styles.statusDot,
              item.status === 'completed'
                ? styles.statusCompleted
                : item.status === 'downloading'
                  ? styles.statusDownloading
                  : styles.statusError,
            ]}
          />
          <Text style={styles.downloadStatus}>
            {item.status === 'completed'
              ? 'Téléchargé'
              : item.status === 'downloading'
                ? `${item.progress}%`
                : 'Erreur'}
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteCourse(item.courseId, item.courseId)}
      >
        <Trash2 size={18} color={colors.semantic.error} />
      </Pressable>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Cours hors-ligne</Text>
        <Text style={styles.subtitle}>
          Accédez à vos cours sans connexion internet
        </Text>
      </View>

      <View style={styles.storageCard}>
        <View style={styles.storageIcon}>
          <HardDrive size={24} color={colors.brand.navy} />
        </View>
        <View style={styles.storageInfo}>
          <Text style={styles.storageTitle}>Stockage utilisé</Text>
          <Text style={styles.storageValue}>
            {formatBytes(usage.totalSize)}
          </Text>
          <Text style={styles.storageDetail}>
            {usage.courseCount} cours téléchargé{usage.courseCount > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {completedDownloads.length === 0 ? (
        <View style={styles.emptySection}>
          <Download size={48} color={colors.neutral.textMuted} />
          <Text style={styles.emptyTitle}>Aucun cours hors-ligne</Text>
          <Text style={styles.emptyText}>
            Téléchargez des cours pour y accéder sans connexion internet.
          </Text>
          <Button variant="primary" onPress={() => navigation.goBack()}>
            Explorer les cours
          </Button>
        </View>
      ) : (
        <FlatList
          data={completedDownloads}
          keyExtractor={(item) => item.courseId}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderDownloadItem}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
  },
  storageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  storageIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  storageInfo: {
    flex: 1,
  },
  storageTitle: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginBottom: spacing.xxs,
  },
  storageValue: {
    ...typography.h2,
    color: colors.neutral.text,
  },
  storageDetail: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: spacing.xxs,
  },
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.huge,
  },
  downloadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  downloadIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  downloadInfo: {
    flex: 1,
  },
  downloadName: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.xxs,
  },
  downloadMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadSize: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginRight: spacing.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  statusCompleted: {
    backgroundColor: colors.semantic.success,
  },
  statusDownloading: {
    backgroundColor: colors.semantic.warning,
  },
  statusError: {
    backgroundColor: colors.semantic.error,
  },
  downloadStatus: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  emptySection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
});
