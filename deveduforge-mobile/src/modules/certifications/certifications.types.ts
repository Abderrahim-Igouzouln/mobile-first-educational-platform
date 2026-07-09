export interface Certificate {
  id: string;
  technologyId: string;
  technologyName: string;
  technologyIcon: string;
  level: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  fullName: string;
  issueDate: string;
  certificateNumber: string;
  score: number;
  totalQuestions: number;
  pdfUrl?: string;
  verificationUrl: string;
  domainColor?: string;
  domainName?: string;
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
