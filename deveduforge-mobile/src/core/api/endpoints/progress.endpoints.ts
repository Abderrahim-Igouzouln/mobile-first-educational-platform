import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface DashboardResponse {
  stats: {
    totalCompleted: number;
    currentStreak: number;
    longestStreak: number;
    achievements: number;
  };
  lastCompletedLessons: {
    lessonId: string;
    title: string;
    completedAt: string;
  }[];
  achievements: {
    code: string;
    title: string;
    description?: string;
    unlockedAt: string;
  }[];
  recentActivity: {
    type: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
  }[];
  activityCalendar: Record<string, number>;
}

export interface AchievementEntry {
  code: string;
  title: string;
  description?: string;
  unlockedAt: string;
}

export interface StreakResponse {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}

export interface TimeSeriesEntry {
  date: string;
  count: number;
}

export interface DomainBreakdownEntry {
  domain: string;
  completed: number;
  total: number;
  percent: number;
}

export interface PlatformComparisonResponse {
  userCompleted: number;
  platformAvg: number;
  userPercentile: number;
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<ApiResponse<DashboardResponse>>('/progress/dashboard');
  return response.data.data;
};

export const getAchievements = async (): Promise<AchievementEntry[]> => {
  const response = await apiClient.get<ApiResponse<AchievementEntry[]>>('/progress/achievements');
  return response.data.data;
};

export const getActivityCalendar = async (): Promise<{ calendar: Record<string, number> }> => {
  const response = await apiClient.get<ApiResponse<{ calendar: Record<string, number> }>>('/progress/activity-calendar');
  return response.data.data;
};

export const getStreak = async (): Promise<StreakResponse> => {
  const response = await apiClient.get<ApiResponse<StreakResponse>>('/progress/streak');
  return response.data.data;
};

export const getTimeSeries = async (days = 30): Promise<TimeSeriesEntry[]> => {
  const response = await apiClient.get<ApiResponse<TimeSeriesEntry[]>>(`/progress/time-series?days=${days}`);
  return response.data.data;
};

export const getDomainBreakdown = async (): Promise<DomainBreakdownEntry[]> => {
  const response = await apiClient.get<ApiResponse<DomainBreakdownEntry[]>>('/progress/domain-breakdown');
  return response.data.data;
};

export const getPlatformComparison = async (): Promise<PlatformComparisonResponse> => {
  const response = await apiClient.get<ApiResponse<PlatformComparisonResponse>>('/progress/platform-comparison');
  return response.data.data;
};
