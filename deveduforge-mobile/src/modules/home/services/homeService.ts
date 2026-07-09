import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as userEndpoints from '../../../core/api/endpoints/user.endpoints';
import * as courseEndpoints from '../../../core/api/endpoints/course.endpoints';
import type { StatItem, ContinueLearning, Domain } from '../home.types';

export const useUserStats = () =>
  useQuery({
    queryKey: [...queryKeys.user.all, 'stats'],
    queryFn: async () => {
      await userEndpoints.getProfile();
      const stats: StatItem[] = [
        {
          id: 'courses',
          label: 'Cours',
          value: '0',
          suffix: '',
        },
        {
          id: 'streak',
          label: 'Séquence',
          value: '0',
          suffix: 'jours',
        },
        {
          id: 'score',
          label: 'Score moyen',
          value: '0',
          suffix: '%',
          isHighlighted: true,
        },
        {
          id: 'certifications',
          label: 'Certifications',
          value: '0',
          suffix: '',
        },
      ];
      return stats;
    },
  });

export const useContinueLearning = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'continue-learning'],
    queryFn: async () => {
      const data = await courseEndpoints.getContinueLearning();
      return data.map(
        (cl): ContinueLearning => ({
          id: cl.courseId,
          technologyName: cl.course.title,
          lessonTitle: cl.lesson.title,
          progress: cl.progress,
          icon: 'BookOpen',
        }),
      );
    },
  });

export const useDomains = () =>
  useQuery({
    queryKey: queryKeys.courses.domains(),
    queryFn: async () => {
      const data = await courseEndpoints.getDomains();
      return data.map(
        (d): Domain => ({
          id: d.id,
          name: d.name,
          techCount: 0,
          isActive: true,
          gradient: ['#00205B', '#1A3A7A'],
          icon: d.icon || 'Code2',
        }),
      );
    },
  });

export const useSearchResults = (query: string) =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'search', query],
    queryFn: async (): Promise<never[]> => [],
    enabled: !!query,
  });
