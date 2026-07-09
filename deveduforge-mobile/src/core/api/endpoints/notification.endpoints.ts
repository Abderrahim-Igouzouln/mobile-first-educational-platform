import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  unreadCount: number;
}

export const getNotifications = async (): Promise<NotificationsResponse> => {
  const response = await apiClient.get<ApiResponse<NotificationsResponse>>('/notifications/notifications');
  return response.data.data;
};

export const markAsRead = async (id: string): Promise<void> => {
  await apiClient.patch(`/notifications/notifications/${id}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await apiClient.patch('/notifications/notifications/read-all');
};
