import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as userEndpoints from '../../../core/api/endpoints/user.endpoints';
import type { ProfileData, ProfileStats, SessionInfo } from '../profile.types';

const mapProfileData = (u: userEndpoints.UserProfile): ProfileData => ({
  firstName: u.firstName,
  lastName: u.lastName,
  email: u.email,
  bio: u.bio,
  avatar: u.avatar,
  memberSince: u.createdAt,
  stats: {
    streak: 0,
    completedLessons: 0,
    averageScore: 0,
    rank: 'Débutant',
  },
});

export const useProfile = () =>
  useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: async () => {
      const data = await userEndpoints.getProfile();
      return mapProfileData(data);
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
