export interface CertificateResponse {
  id: string;
  certificateNumber: string;
  technologyName: string;
  technologyIcon: string;
  scorePercent: number;
  issuedAt: string;
  pdfUrl?: string;
  qrCodeData: string;
  isRevoked: boolean;
  skills: string[];
}

export interface CertificateVerificationResponse {
  isValid: boolean;
  recipientName?: string;
  technologyName?: string;
  scorePercent?: number;
  issuedAt?: string;
  revokedReason?: string;
}
