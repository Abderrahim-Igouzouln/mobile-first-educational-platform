export interface CertificateResponse {
  id: string;
  certificateNumber: string;
  technologyName: string;
  technologySlug: string;
  scorePercent: number;
  issuedAt: Date | null;
  pdfUrl?: string | null;
  status: string;
  priceMad: number;
  unlockedAt?: Date | null;
  paidAt?: Date | null;
  fullName?: string;
  verificationUrl?: string;
  courseId?: string;
  courseTitle?: string;
}

export interface CertificateVerificationResponse {
  isValid: boolean;
  recipientName?: string;
  technologyName?: string;
  scorePercent?: number;
  issuedAt?: string;
  revokedReason?: string;
}

export interface CourseCompletionStatus {
  lessonsCompleted: number;
  lessonsTotal: number;
  exercisesPassed: number;
  exercisesTotal: number;
  projectApproved: boolean;
  isComplete: boolean;
}

export interface CheckoutResponse {
  id: string;
  certificateNumber: string;
  amountMad: number;
  currency: string;
}
