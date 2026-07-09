import { apiClient } from '../apiClient';
import type { LoginCredentials, RegisterData, AuthTokens, User } from '../../auth/auth.types';
import type { ApiResponse } from '../api.types';

export const login = async (credentials: LoginCredentials): Promise<AuthTokens & { user: User }> => {
  const response = await apiClient.post<ApiResponse<AuthTokens & { user: User }>>('/auth/login', credentials);
  return response.data.data;
};

export const register = async (data: RegisterData): Promise<AuthTokens & { user: User }> => {
  const response = await apiClient.post<ApiResponse<AuthTokens & { user: User }>>('/auth/register', data);
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const logoutAll = async (): Promise<void> => {
  await apiClient.post('/auth/logout-all');
};

export const refreshToken = async (token: string): Promise<AuthTokens> => {
  const response = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken: token });
  return response.data.data;
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');
  return response.data.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

export const resetPassword = async (data: { token: string; password: string }): Promise<void> => {
  await apiClient.post('/auth/reset-password', data);
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
  await apiClient.post('/auth/change-password', data);
};

export const verifyEmail = async (token: string): Promise<void> => {
  await apiClient.post('/auth/verify-email', { token });
};
