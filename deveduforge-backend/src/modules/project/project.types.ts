export interface ProjectResponse {
  id: string;
  title: string;
  instructions: string;
  evaluationCriteria: string;
  courseTitle: string;
}

export interface SubmissionResponse {
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
