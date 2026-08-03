import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as projectEndpoints from '../../../core/api/endpoints/project.endpoints';
import type { Project } from '../projects.types';

const mapProject = (p: projectEndpoints.Project): Project => ({
  id: p.id,
  title: p.title,
  description: p.instructions,
  difficulty: 'intermediaire',
  technologies: [p.courseTitle],
  duration: '2-3 heures',
  steps: [
    { id: '1', title: 'Mise en place', description: 'Initialiser le projet React avec Vite et TypeScript', completed: false },
    { id: '2', title: 'Composants', description: 'Créer Sidebar, Header, Dashboard, Widget, UserList', completed: false },
    { id: '3', title: 'State & Effets', description: 'Implémenter useState, useEffect, useContext', completed: false },
    { id: '4', title: 'Fonctionnalités', description: 'Thème clair/sombre, sidebar repliable, horloge live', completed: false },
  ],
  status: 'a_faire',
  icon: 'FolderKanban',
  requirements: [
    'Composants fonctionnels TypeScript',
    'useState pour les états locaux',
    'useEffect pour les appels API et timers',
    'useContext pour le thème',
  ],
});

export const useProjects = (courseId?: string) =>
  useQuery({
    queryKey: queryKeys.projects.list(courseId),
    queryFn: async () => {
      if (!courseId) return [];
      const data = await projectEndpoints.getProjects(courseId);
      return data.map(mapProject);
    },
    enabled: !!courseId,
  });

export const useProjectDetail = (projectId: string) =>
  useQuery({
    queryKey: queryKeys.projects.detail(projectId),
    queryFn: async () => {
      const data = await projectEndpoints.getProjectDetail(projectId);
      return mapProject(data);
    },
    enabled: !!projectId,
  });

export const useMyProjects = () =>
  useQuery({
    queryKey: queryKeys.projects.my(),
    queryFn: async () => {
      const submissions = await projectEndpoints.getMySubmissions();
      return submissions.map((s) => ({
        id: s.id,
        title: s.projectTitle,
        description: '',
        difficulty: 'intermediaire' as const,
        technologies: [],
        duration: '',
        steps: [],
        status: (s.status === 'approved' ? 'approuve' :
                 s.status === 'rejected' ? 'a_revoir' :
                 s.status === 'submitted' ? 'soumis' :
                 'en_cours') as Project['status'],
        icon: 'FolderKanban',
        requirements: [],
        userSubmission: {
          id: s.id,
          projectId: s.projectTitle,
          title: s.projectTitle,
          description: '',
          githubUrl: s.repositoryUrl ?? undefined,
          status: (s.status === 'approved' ? 'approuve' :
                    s.status === 'rejected' ? 'a_revoir' :
                    s.status === 'submitted' ? 'soumis' :
                    'en_cours') as Project['status'],
          submittedAt: s.submittedAt,
          grade: s.review?.score,
          feedback: s.review?.feedback,
          reviewerName: s.review?.reviewerName,
        },
      }));
    },
  });

export const useProjectReview = (submissionId: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'review', submissionId],
    queryFn: async () => {
      const submissions = await projectEndpoints.getMySubmissions();
      const sub = submissions.find((s) => s.id === submissionId);
      if (!sub?.review) return null;
      return {
        id: `review-${submissionId}`,
        submissionId,
        grade: sub.review.score,
        feedback: sub.review.feedback,
        reviewerName: sub.review.reviewerName,
        reviewedAt: sub.review.reviewedAt,
        scoreCategories: [] as { name: string; label: string; score: number; maxScore: number }[],
      };
    },
    enabled: !!submissionId,
  });

export const useProjectSubmissionQuery = (submissionId: string) =>
  useQuery({
    queryKey: [...queryKeys.projects.all, 'submission', submissionId],
    queryFn: async () => {
      const submissions = await projectEndpoints.getMySubmissions();
      const s = submissions.find((sub) => sub.id === submissionId);
      if (!s) return null;
      return {
        id: s.id,
        projectId: s.projectTitle,
        title: s.projectTitle,
        description: '',
        githubUrl: s.repositoryUrl ?? undefined,
        status: (s.status === 'approved' ? 'approuve' :
                  s.status === 'rejected' ? 'a_revoir' :
                  s.status === 'submitted' ? 'soumis' :
                  'en_cours') as Project['status'],
        submittedAt: s.submittedAt,
        grade: s.review?.score,
        feedback: s.review?.feedback,
        reviewerName: s.review?.reviewerName,
      };
    },
    enabled: !!submissionId,
  });

export const useProjectSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, ...data }: { projectId: string; repositoryUrl?: string; fileUrl?: string }) =>
      projectEndpoints.submitProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};
