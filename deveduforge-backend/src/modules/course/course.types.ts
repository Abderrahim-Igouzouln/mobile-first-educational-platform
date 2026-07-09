export interface DomainResponse {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  colorTheme: string;
  order: number;
  technologyCount: number;
}

export interface TechnologyResponse {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  isPremiumOnly: boolean;
  isLocked: boolean;
}

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  level: string;
  estimatedDurationMin: number;
  isPublished: boolean;
  progressPercent: number;
  lessonCount: number;
}

export interface LessonResponse {
  id: string;
  title: string;
  order: number;
  durationMin: number;
  videoUrl?: string | null;
  isPublished: boolean;
  status: string;
  isLocked: boolean;
  contentMarkdown?: string;
}

export interface CourseDetailResponse {
  id: string;
  title: string;
  description: string;
  level: string;
  estimatedDurationMin: number;
  isPublished: boolean;
  authorName: string;
  lessons: LessonResponse[];
}

export interface BookmarkResponse {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  createdAt: string;
}
