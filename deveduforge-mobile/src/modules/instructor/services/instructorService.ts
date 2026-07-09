import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as instructorEndpoints from '../../../core/api/endpoints/instructor.endpoints';

export const useInstructorStats = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'instructor', 'stats'],
    queryFn: instructorEndpoints.getInstructorStats,
  });

export const useInstructorCourses = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'instructor', 'courses'],
    queryFn: instructorEndpoints.getInstructorCourses,
  });
