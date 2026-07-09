import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface Domain {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  domainId: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  technologyId: string;
  lessonsCount: number;
  completedLessonsCount?: number;
  duration?: number;
  level?: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  courseId: string;
  isCompleted: boolean;
  isBookmarked: boolean;
}

export interface Bookmark {
  id: string;
  lessonId: string;
  lesson: Lesson;
  createdAt: string;
}

export interface ContinueLearning {
  courseId: string;
  course: Course;
  lessonId: string;
  lesson: Lesson;
  progress: number;
}

export const getDomains = async (): Promise<Domain[]> => {
  const response = await apiClient.get<ApiResponse<Domain[]>>('/courses/domains');
  return response.data.data;
};

export const getTechnologies = async (domainSlug: string): Promise<Technology[]> => {
  const response = await apiClient.get<ApiResponse<Technology[]>>(`/courses/domains/${domainSlug}/technologies`);
  return response.data.data;
};

export const getCourses = async (technologySlug: string): Promise<Course[]> => {
  const response = await apiClient.get<ApiResponse<Course[]>>(`/courses/technologies/${technologySlug}/courses`);
  return response.data.data;
};

export const getCourse = async (courseId: string): Promise<Course & { lessons: Lesson[] }> => {
  const response = await apiClient.get<ApiResponse<Course & { lessons: Lesson[] }>>(`/courses/courses/${courseId}`);
  return response.data.data;
};

export const completeLesson = async (lessonId: string): Promise<void> => {
  await apiClient.post(`/courses/lessons/${lessonId}/complete`);
};

export const toggleBookmark = async (lessonId: string): Promise<{ isBookmarked: boolean }> => {
  const response = await apiClient.post<ApiResponse<{ isBookmarked: boolean }>>(`/courses/lessons/${lessonId}/bookmark`);
  return response.data.data;
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const response = await apiClient.get<ApiResponse<Bookmark[]>>('/courses/bookmarks');
  return response.data.data;
};

export const getContinueLearning = async (): Promise<ContinueLearning[]> => {
  const response = await apiClient.get<ApiResponse<ContinueLearning[]>>('/courses/continue-learning');
  return response.data.data;
};
