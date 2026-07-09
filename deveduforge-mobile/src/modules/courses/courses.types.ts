export interface Domain {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
  gradientColors: [string, string];
  order: number;
  technologiesCount: number;
  completedCount: number;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  domainId: string;
  domainName?: string;
  domainColor?: string;
  level: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  order: number;
  coursesCount: number;
  completedCoursesCount: number;
  isLocked: boolean;
  isPremium: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  technologyId: string;
  technologyName?: string;
  domainName?: string;
  domainColor?: string;
  lessonsCount: number;
  completedLessonsCount: number;
  duration: number;
  level: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  isPremium: boolean;
  isDownloaded: boolean;
  downloadSize?: number;
  createdAt: string;
  updatedAt: string;
}

export type LessonType = 'lecture' | 'video' | 'exercise' | 'project' | 'quiz';
export type LessonStatus = 'locked' | 'available' | 'current' | 'completed';

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  type: LessonType;
  content?: string;
  videoUrl?: string;
  videoPosition?: number;
  duration: number;
  order: number;
  courseId: string;
  courseTitle?: string;
  status: LessonStatus;
  isCompleted: boolean;
  isBookmarked: boolean;
  exercisesCount: number;
}

export interface Lecture {
  id: string;
  lessonId: string;
  title: string;
  content: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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

export interface Note {
  id: string;
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: 'local' | 'synced' | 'pending';
}

export interface DownloadState {
  courseId: string;
  status: 'downloading' | 'completed' | 'paused' | 'error';
  progress: number;
  totalSize: number;
  downloadedSize: number;
  error?: string;
}

export interface CourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  remainingLessons: number;
  lastLessonId?: string;
  lastLessonTitle?: string;
}

export interface TabOption {
  key: string;
  label: string;
}
