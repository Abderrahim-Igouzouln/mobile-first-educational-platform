import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  firstName: string;
  score: number;
}

export const getLeaderboard = async (period: string = 'weekly'): Promise<LeaderboardEntry[]> => {
  const response = await apiClient.get<ApiResponse<LeaderboardEntry[]>>(`/community/leaderboard?period=${period}`);
  return response.data.data;
};
