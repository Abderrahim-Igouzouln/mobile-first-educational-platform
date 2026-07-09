import { apiClient } from '../apiClient';
import type { User } from '../../auth/auth.types';
import type { ApiResponse } from '../api.types';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface PreferencesData {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
  };
}

export interface UserProfile extends User {
  bio?: string;
  phone?: string;
  preferences?: PreferencesData;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>('/users/me/profile');
  return response.data.data;
};

export const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await apiClient.patch<ApiResponse<UserProfile>>('/users/me/profile', data);
  return response.data.data;
};

export const updatePreferences = async (data: PreferencesData): Promise<PreferencesData> => {
  const response = await apiClient.patch<ApiResponse<PreferencesData>>('/users/me/preferences', data);
  return response.data.data;
};

export const deleteAccount = async (): Promise<void> => {
  await apiClient.delete('/users/me');
};

export const exportData = async (): Promise<Blob> => {
  const response = await apiClient.get('/users/me/export', { responseType: 'blob' });
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
};

export const updateUserStatus = async (id: string, status: string): Promise<User> => {
  const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/status`, { status });
  return response.data.data;
};
