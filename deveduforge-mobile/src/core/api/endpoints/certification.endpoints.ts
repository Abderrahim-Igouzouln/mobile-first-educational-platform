import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface CertificateDTO {
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

export interface CompletionStatusDTO {
  lessonsCompleted: number;
  lessonsTotal: number;
  exercisesPassed: number;
  exercisesTotal: number;
  projectApproved: boolean;
  isComplete: boolean;
}

export interface CheckoutDTO {
  id: string;
  certificateNumber: string;
  amountMad: number;
  currency: string;
}

export const getCertificates = async (): Promise<CertificateDTO[]> => {
  const response = await apiClient.get<ApiResponse<CertificateDTO[]>>('/certifications/certificates');
  return response.data.data;
};

export const getCompletionStatus = async (courseId: string): Promise<CompletionStatusDTO> => {
  const response = await apiClient.get<ApiResponse<CompletionStatusDTO>>(`/certifications/courses/${courseId}/completion-status`);
  return response.data.data;
};

export const requestCheckout = async (certificateId: string): Promise<CheckoutDTO> => {
  const response = await apiClient.post<ApiResponse<CheckoutDTO>>(`/certifications/certificates/${certificateId}/checkout`);
  return response.data.data;
};

export const downloadCertificate = async (certificateId: string): Promise<{ pdfData?: string; pdfUrl?: string; fileName: string }> => {
  const response = await apiClient.post<ApiResponse<{ pdfData?: string; pdfUrl?: string; fileName: string }>>(`/certifications/certificates/${certificateId}/download`);
  return response.data.data;
};

export const issueCertificate = async (data: { courseId: string; scorePercent: number }): Promise<CertificateDTO> => {
  const response = await apiClient.post<ApiResponse<CertificateDTO>>('/certifications/certificates/issue', data);
  return response.data.data;
};

export const verifyCertificate = async (number: string): Promise<{ valid: boolean; fullName: string; technology: string }> => {
  const response = await apiClient.get<ApiResponse<{ valid: boolean; fullName: string; technology: string }>>(`/certifications/certificates/verify/${number}`);
  return response.data.data;
};

export const revokeCertificate = async (id: string): Promise<void> => {
  await apiClient.post(`/certifications/certificates/${id}/revoke`);
};
