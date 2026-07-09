export interface ProfileStats {
  streak: number;
  completedLessons: number;
  averageScore: number;
  rank: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  avatar?: string;
  memberSince: string;
  stats: ProfileStats;
}

export interface NotificationSetting {
  id: string;
  label: string;
  key: string;
  enabled: boolean;
}

export interface SessionInfo {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}
