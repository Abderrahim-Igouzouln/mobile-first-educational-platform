import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as courseEndpoints from '../../../core/api/endpoints/course.endpoints';
import type {
  Domain,
  Technology,
  Course,
  Lesson,
  Bookmark,
  ContinueLearning,
} from '../courses.types';

const mapDomain = (d: courseEndpoints.Domain & { technologiesCount?: number; completedCount?: number }): Domain => ({
  id: d.id,
  name: d.name,
  slug: d.slug,
  description: d.description,
  icon: d.icon || 'Code2',
  color: '#00205B',
  gradientColors: ['#00205B', '#1A3A7A'],
  order: d.order,
  technologiesCount: d.technologiesCount ?? 0,
  completedCount: d.completedCount ?? 0,
});

const mapTechnology = (
  t: courseEndpoints.Technology & { level?: string; isLocked?: boolean; coursesCount?: number; completedCoursesCount?: number },
  domainColor?: string,
): Technology => ({
  id: t.id,
  name: t.name,
  slug: t.slug,
  description: t.description,
  icon: t.icon || 'Monitor',
  domainId: t.domainId,
  domainColor,
  level: (t.level as Technology['level']) || 'debutant',
  order: t.order,
  coursesCount: t.coursesCount ?? 0,
  completedCoursesCount: t.completedCoursesCount ?? 0,
  isLocked: t.isLocked ?? false,
  isPremium: false,
});

const mapCourse = (c: courseEndpoints.Course): Course => ({
  id: c.id,
  title: c.title,
  slug: c.title.toLowerCase().replace(/\s+/g, '-'),
  description: c.description,
  thumbnail: c.thumbnail,
  technologyId: c.technologyId,
  lessonsCount: c.lessonsCount ?? c.lessonCount ?? 0,
  completedLessonsCount: c.completedLessonsCount ?? 0,
  duration: c.duration ?? c.estimatedDurationMin ?? 0,
  level: (c.level as Course['level']) || 'debutant',
  isPremium: c.isPremium,
  isDownloaded: false,
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});

const mapLesson = (l: courseEndpoints.Lesson, index?: number): Lesson => ({
  id: l.id,
  title: l.title,
  slug: l.title.toLowerCase().replace(/\s+/g, '-'),
  type: l.videoUrl ? 'video' : 'lecture',
  content: l.content ?? l.contentMarkdown,
  videoUrl: l.videoUrl,
  duration: l.duration ?? l.durationMin ?? 0,
  order: l.order,
  courseId: l.courseId,
  status: l.isCompleted ? 'completed' : index === 0 ? 'current' : 'available',
  isCompleted: l.isCompleted,
  isBookmarked: l.isBookmarked,
  exercisesCount: l.exercisesCount ?? 0,
});

export const useDomains = () =>
  useQuery({
    queryKey: queryKeys.courses.domains(),
    queryFn: async () => {
      const data = await courseEndpoints.getDomains();
      return data.map(mapDomain);
    },
  });

export const useTechnologies = (domainId: string) =>
  useQuery({
    queryKey: queryKeys.courses.technologies(domainId),
    queryFn: async () => {
      const data = await courseEndpoints.getTechnologies(domainId);
      return data.map((t) => mapTechnology(t));
    },
    enabled: !!domainId,
  });

export const useCourse = (courseId: string) =>
  useQuery({
    queryKey: queryKeys.courses.detail(courseId),
    queryFn: async () => {
      const data = await courseEndpoints.getCourse(courseId);
      return {
        ...mapCourse(data),
        lessons: (data as Course & { lessons: courseEndpoints.Lesson[] }).lessons?.map(mapLesson) ?? [],
      };
    },
    enabled: !!courseId,
  });

export const useCoursesForTechnology = (technologySlug: string) =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'tech-courses', technologySlug],
    queryFn: async () => {
      const data = await courseEndpoints.getCourses(technologySlug);
      return data.map(mapCourse);
    },
    enabled: !!technologySlug,
  });

export const useCourseDetailByTech = (technologySlug: string) =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'tech-detail', technologySlug],
    queryFn: async () => {
      const courses = await courseEndpoints.getCourses(technologySlug);
      if (!courses.length) return null;
      const data = await courseEndpoints.getCourse(courses[0].id);
      return {
        ...mapCourse(data),
        lessons: (data as Course & { lessons: courseEndpoints.Lesson[] }).lessons?.map(mapLesson) ?? [],
      };
    },
    enabled: !!technologySlug,
  });

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => courseEndpoints.completeLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
    },
  });
};

export const useBookmarks = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'bookmarks'],
    queryFn: async () => {
      const data = await courseEndpoints.getBookmarks();
      return data.map((b) => ({
        ...b,
        lesson: mapLesson(b.lesson),
      }));
    },
  });

export const useContinueLearning = () =>
  useQuery({
    queryKey: [...queryKeys.courses.all, 'continue-learning'],
    queryFn: async () => {
      const data = await courseEndpoints.getContinueLearning();
      return data.map((cl) => ({
        ...cl,
        course: mapCourse(cl.course),
        lesson: mapLesson(cl.lesson),
      }));
    },
  });
