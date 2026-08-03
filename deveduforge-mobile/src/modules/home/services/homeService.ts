import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as courseEndpoints from '../../../core/api/endpoints/course.endpoints';
import * as progressEndpoints from '../../../core/api/endpoints/progress.endpoints';
import type { StatItem, ContinueLearning, Domain, ActivityItem } from '../home.types';

const DASHBOARD_KEY = queryKeys.progress.dashboard();

export const useUserStats = () =>
  useQuery({
    queryKey: DASHBOARD_KEY,
    queryFn: () => progressEndpoints.getDashboard(),
    select: (dashboard) => {
      const stats: StatItem[] = [
        { id: 'courses', label: 'Cours', value: String(dashboard.stats.totalCompleted), suffix: '' },
        { id: 'streak', label: 'Séquence', value: String(dashboard.stats.currentStreak), suffix: 'jours' },
        { id: 'score', label: 'Score moyen', value: '0', suffix: '%', isHighlighted: true },
        { id: 'certifications', label: 'Certifications', value: String(dashboard.stats.achievements), suffix: '' },
      ];
      return stats;
    },
  });

export const useRecentActivity = () =>
  useQuery({
    queryKey: DASHBOARD_KEY,
    queryFn: () => progressEndpoints.getDashboard(),
    select: (dashboard) => {
      const activities: ActivityItem[] = dashboard.recentActivity.map((a, i) => {
        let type: 'course' | 'exercise' | 'certification' = 'course';
        let color = '#00205B';
        if (a.type.includes('exercise') || a.type.includes('quiz')) {
          type = 'exercise';
          color = '#FF6B35';
        } else if (a.type.includes('certificate') || a.type.includes('certification')) {
          type = 'certification';
          color = '#00A86B';
        }
        return {
          id: `${i}`,
          type,
          title: a.type,
          description: typeof a.metadata?.description === 'string' ? a.metadata.description : '',
          timestamp: new Date(a.createdAt).toLocaleDateString('fr-FR'),
          color,
        };
      });
      return activities;
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
          slug: d.slug,
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
