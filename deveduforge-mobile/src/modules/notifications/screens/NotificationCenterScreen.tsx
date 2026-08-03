import React, { useCallback } from 'react';
import {
  View, Text, FlatList, Pressable, StyleSheet,
} from 'react-native';
import { Bell, CheckCheck } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { SkeletonLoader } from '../../../shared/components/ui/feedback/SkeletonLoader';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/spacing';
import { useGetNotifications, useMarkAllRead, useMarkRead } from '../services/notificationService';
import type { NotificationItem } from '../../../core/api/endpoints/notification.endpoints';

function NotificationRow({
  item,
  onPress,
}: {
  item: NotificationItem;
  onPress: (item: NotificationItem) => void;
}) {
  const { colors, typography } = useTheme();

  const typeColors: Record<string, string> = {
    certificate: colors.semantic.success,
    achievement: colors.brand.orange,
    course: colors.brand.navy,
    community: colors.semantic.info,
    payment: colors.semantic.warning,
    system: colors.neutral.textMuted,
  };

  const dotColor = typeColors[item.type] ?? colors.neutral.textMuted;

  return (
    <Pressable onPress={() => onPress(item)} role="button">
      <View
        style={[
          styles.row,
          {
            backgroundColor: item.readAt
              ? colors.neutral.surface
              : `${colors.brand.navy}08`,
            borderBottomColor: colors.neutral.border,
          },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: item.readAt ? 'transparent' : dotColor }]} />
        <View style={styles.content}>
          <Text
            style={[
              typography.body,
              {
                color: colors.neutral.text,
                fontWeight: item.readAt ? '400' : '700',
              },
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {item.body && (
            <Text
              style={[typography.bodySmall, { color: colors.neutral.textLight }]}
              numberOfLines={2}
            >
              {item.body}
            </Text>
          )}
          <Text style={[typography.bodySmall, { color: colors.neutral.textMuted, marginTop: spacing.xs }]}>
            {new Date(item.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function NotificationCenterScreen() {
  const { colors, typography } = useTheme();

  const { data, isLoading, refetch } = useGetNotifications();
  const { mutate: markRead } = useMarkRead();
  const { mutate: markAllRead } = useMarkAllRead();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const handleNotificationPress = useCallback(
    (item: NotificationItem) => {
      if (!item.readAt) markRead(item.id);
    },
    [markRead],
  );

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }]}>
        <View>
          <Text style={[typography.h1, { color: colors.neutral.text }]}>
            Notifications
          </Text>
          {unreadCount > 0 && (
            <Text style={[typography.bodySmall, { color: colors.neutral.textLight }]}>
              {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
            </Text>
          )}
        </View>
        {unreadCount > 0 && (
          <Pressable onPress={() => markAllRead()} role="button" accessibilityLabel="Tout marquer comme lu">
            <CheckCheck size={22} color={colors.brand.orange} />
          </Pressable>
        )}
      </View>

      {isLoading ? (
        <View style={{ paddingHorizontal: spacing.lg }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={{ marginBottom: 1 }}>
              <SkeletonLoader width="100%" height={80} borderRadius={0} />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item: NotificationItem) => item.id}
          renderItem={({ item }) => (
            <NotificationRow item={item} onPress={handleNotificationPress} />
          )}
          onRefresh={refetch}
          refreshing={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Bell size={48} color={colors.neutral.textMuted} />
              <Text style={[typography.h2, { color: colors.neutral.text, marginTop: spacing.md }]}>
                Aucune notification
              </Text>
              <Text style={[typography.body, { color: colors.neutral.textLight }]}>
                Vous n'avez pas encore de notifications.
              </Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: spacing.md,
    flexShrink: 0,
  },
  content: { flex: 1 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: spacing.xxl,
  },
});
