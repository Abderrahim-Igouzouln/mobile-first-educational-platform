export interface StatsResponse {
  totalLessonsCompleted: number;
  totalCertificates: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
}

export interface StreakResponse {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export interface AchievementResponse {
  code: string;
  title: string;
  description?: string;
  unlockedAt: string;
}

export interface ActivityResponse {
  id: string;
  type: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
