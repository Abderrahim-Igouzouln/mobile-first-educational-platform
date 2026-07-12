import { Level } from '@prisma/client';

export interface ContentQuestion {
  prompt: string;
  explanation: string;
  points: number;
  options: { label: string; isCorrect: boolean; order: number }[];
}

export interface ContentLessonBase {
  title: string;
  durationMin: number;
  contentMarkdown: string;
}

export interface ContentExercise {
  title: string;
  passingScorePercent: number;
  questions: ContentQuestion[];
}

export interface ContentProject {
  title: string;
  instructions: string;
  evaluationCriteria: string[];
}

export interface CourseContent {
  techSlug: string;
  title: string;
  description: string;
  level: Level;
  durationMin: number;
  lessons: (ContentLessonBase & { exercise: ContentExercise })[];
  project: ContentProject;
}
