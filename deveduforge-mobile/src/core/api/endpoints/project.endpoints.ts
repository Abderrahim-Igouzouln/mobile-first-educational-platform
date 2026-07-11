import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface Project {
  id: string;
  title: string;
  instructions: string;
  evaluationCriteria: string;
  courseTitle: string;
}

export interface Submission {
  id: string;
  projectTitle: string;
  repositoryUrl?: string | null;
  fileUrl?: string | null;
  status: string;
  submittedAt: string;
  review?: {
    score: number;
    feedback: string;
    reviewerName: string;
    reviewedAt: string;
  } | null;
  comments: Array<{
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
  }>;
}

export const getProjects = async (courseId: string): Promise<Project[]> => {
  const response = await apiClient.get<ApiResponse<Project[]>>(`/projects/courses/${courseId}/projects`);
  return response.data.data;
};

export const getProjectDetail = async (id: string): Promise<Project> => {
  const response = await apiClient.get<ApiResponse<Project>>(`/projects/projects/${id}`);
  return response.data.data;
};

export const submitProject = async (
  id: string,
  data: { repositoryUrl?: string; fileUrl?: string }
): Promise<Submission> => {
  const response = await apiClient.post<ApiResponse<Submission>>(`/projects/projects/${id}/submit`, data);
  return response.data.data;
};

export const getMySubmissions = async (): Promise<Submission[]> => {
  const response = await apiClient.get<ApiResponse<Submission[]>>('/projects/submissions');
  return response.data.data;
};

export const addComment = async (submissionId: string, content: string): Promise<void> => {
  await apiClient.post(`/projects/submissions/${submissionId}/comments`, { content });
};
