import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as userEndpoints from '../../../core/api/endpoints/user.endpoints';
import * as progressEndpoints from '../../../core/api/endpoints/progress.endpoints';
import type { ProfileData, ProfileStats, SessionInfo } from '../profile.types';

export const useProfile = () =>
  useQuery({
    queryKey: [...queryKeys.user.profile(), ...queryKeys.progress.dashboard()],
    queryFn: async () => {
      const [userData, dashboard] = await Promise.all([
        userEndpoints.getProfile(),
        progressEndpoints.getDashboard().catch(() => null),
      ]);
      const stats: ProfileStats = dashboard
        ? {
            streak: dashboard.stats.currentStreak,
            completedLessons: dashboard.stats.totalCompleted,
            averageScore: 0,
            rank: dashboard.stats.totalCompleted >= 20 ? 'Avancé' : dashboard.stats.totalCompleted >= 10 ? 'Intermédiaire' : 'Débutant',
          }
        : { streak: 0, completedLessons: 0, averageScore: 0, rank: 'Débutant' };
      return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        bio: userData.bio,
        avatar: userData.avatar,
        memberSince: userData.createdAt,
        stats,
      } satisfies ProfileData;
    },
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: userEndpoints.UpdateProfileData) => userEndpoints.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
    },
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: userEndpoints.PreferencesData) => userEndpoints.updatePreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: () => userEndpoints.deleteAccount(),
  });

export const useSessions = () =>
  useQuery({
    queryKey: [...queryKeys.user.all, 'sessions'],
    queryFn: async (): Promise<SessionInfo[]> => [],
  });
