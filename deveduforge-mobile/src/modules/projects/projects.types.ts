export type DifficultyLevel = 'debutant' | 'intermediaire' | 'avance';

export type ProjectStatus = 'a_faire' | 'en_cours' | 'soumis' | 'approuve' | 'a_revoir';

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  resources?: string;
  completed: boolean;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  title: string;
  description: string;
  files?: string[];
  githubUrl?: string;
  notes?: string;
  status: ProjectStatus;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  reviewerName?: string;
  reviewerAvatar?: string;
  scoreCategories?: ProjectScoreCategory[];
}

export interface ProjectScoreCategory {
  name: string;
  label: string;
  score: number;
  maxScore: number;
}

export interface ProjectReview {
  id: string;
  submissionId: string;
  grade: number;
  feedback: string;
  scoreCategories: ProjectScoreCategory[];
  reviewedAt: string;
  reviewerName: string;
  reviewerAvatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  technologies: string[];
  duration: string;
  steps: ProjectStep[];
  status: ProjectStatus;
  icon: string;
  requirements: string[];
  resources?: { label: string; url: string }[];
  userSubmission?: ProjectSubmission;
}

export type ProjectStackParamList = {
  ProjectsScreen: undefined;
  ProjectDetailScreen: { projectId: string };
  ProjectSubmissionScreen: { projectId: string };
  ProjectReviewScreen: { projectId: string; submissionId: string };
};
