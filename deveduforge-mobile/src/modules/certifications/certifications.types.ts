export interface Certificate {
  id: string;
  certificateNumber: string;
  technologyName: string;
  technologySlug: string;
  scorePercent: number;
  issuedAt: string | null;
  pdfUrl?: string | null;
  status: 'locked' | 'unlocked' | 'paid';
  priceMad: number;
  unlockedAt?: string | null;
  paidAt?: string | null;
  fullName?: string;
  verificationUrl?: string;
  courseId?: string;
  courseTitle?: string;
}

export interface CertificationAttempt {
  id: string;
  certificationId: string;
  technologyName: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  totalQuestions: number;
  passed: boolean;
  sections: ExamSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  status: 'in_progress' | 'completed' | 'expired';
}

export interface ExamSection {
  id: string;
  title: string;
  timeLimitMinutes: number;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  selectedIndex?: number;
  isAnswered: boolean;
}
