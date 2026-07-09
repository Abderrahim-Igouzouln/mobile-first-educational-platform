import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import type { Project, ProjectReview, ProjectSubmission } from '../projects.types';

export const useProjects = (courseId?: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'list', ...(courseId ? [courseId] : [])],
    queryFn: async (): Promise<Project[]> => [],
  });

export const useProjectDetail = (projectId: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'detail', projectId],
    queryFn: async (): Promise<Project | null> => null,
    enabled: !!projectId,
  });

export const useMyProjects = () =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'my'],
    queryFn: async (): Promise<Project[]> => [],
  });

export const useProjectReview = (submissionId: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'review', submissionId],
    queryFn: async (): Promise<ProjectReview | null> => null,
    enabled: !!submissionId,
  });

export const useProjectSubmission = (submissionId: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'submission', submissionId],
    queryFn: async (): Promise<ProjectSubmission | null> => null,
    enabled: !!submissionId,
  });
