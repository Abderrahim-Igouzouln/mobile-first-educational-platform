import { apiClient } from '../apiClient';

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  avgRating: number;
  pendingReviews: number;
  completions: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  isPublished: boolean;
  lessonCount: number;
  studentCount: number;
  createdAt: string;
}

export const getInstructorStats = async (): Promise<InstructorStats> => {
  const { data } = await apiClient.get('/instructor/stats');
  return data.data;
};

export const getInstructorCourses = async (): Promise<InstructorCourse[]> => {
  const { data } = await apiClient.get('/instructor/courses');
  return data.data;
};
