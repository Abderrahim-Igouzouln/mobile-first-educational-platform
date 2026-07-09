import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as notificationEndpoints from '../../../core/api/endpoints/notification.endpoints';

export const useGetNotifications = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'notifications'],
    queryFn: notificationEndpoints.getNotifications,
  });

export const useMarkRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationEndpoints.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.courses.all, 'notifications'] });
    },
  });
};

export const useMarkAllRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationEndpoints.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.courses.all, 'notifications'] });
    },
  });
};
