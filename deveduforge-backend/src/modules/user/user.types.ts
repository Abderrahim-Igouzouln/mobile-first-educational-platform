export interface UserPreferences {
  locale: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  offlineMode: boolean;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: string;
  locale: string;
  emailVerifiedAt?: string | null;
  status: string;
  createdAt: Date;
  lastLoginAt?: Date | null;
  stats: {
    streak: number;
    completedLessons: number;
    inProgressLessons: number;
    certificatesCount: number;
    submissionsCount: number;
    achievementsCount: number;
  };
  preferences: UserPreferences;
}
