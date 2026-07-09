import { useMemo } from 'react';
import type { Course, Lesson, CourseProgress } from '../courses.types';

export const useCourseProgress = (
  course: Course | undefined,
  lessons: Lesson[],
): CourseProgress | null => {
  return useMemo(() => {
    if (!course) return null;

    const completedLessons = lessons.filter((l) => l.isCompleted).length;
    const totalLessons = lessons.length || course.lessonsCount;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const remainingLessons = totalLessons - completedLessons;

    const lastCompleted = lessons.filter((l) => l.isCompleted).pop();

    return {
      courseId: course.id,
      totalLessons,
      completedLessons,
      percentage,
      remainingLessons,
      lastLessonId: lastCompleted?.id,
      lastLessonTitle: lastCompleted?.title,
    };
  }, [course, lessons]);
};

export const useCourseProgressPercentage = (
  completedCount: number,
  totalCount: number,
): number => {
  return useMemo(() => {
    if (totalCount === 0) return 0;
    return Math.round((completedCount / totalCount) * 100);
  }, [completedCount, totalCount]);
};
