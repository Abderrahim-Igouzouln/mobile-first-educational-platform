import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface Certificate {
  id: string;
  number: string;
  userId: string;
  technologyId: string;
  technologyName: string;
  issuedAt: string;
  revokedAt?: string;
  isRevoked: boolean;
  downloadUrl?: string;
}

export const getCertificates = async (): Promise<Certificate[]> => {
  const response = await apiClient.get<ApiResponse<Certificate[]>>('/certifications/certificates');
  return response.data.data;
};

export const issueCertificate = async (data: { technologyId: string }): Promise<Certificate> => {
  const response = await apiClient.post<ApiResponse<Certificate>>('/certifications/certificates/issue', data);
  return response.data.data;
};

export const verifyCertificate = async (number: string): Promise<Certificate> => {
  const response = await apiClient.get<ApiResponse<Certificate>>(`/certifications/certificates/verify/${number}`);
  return response.data.data;
};

export const revokeCertificate = async (id: string): Promise<void> => {
  await apiClient.post(`/certifications/certificates/${id}/revoke`);
};
