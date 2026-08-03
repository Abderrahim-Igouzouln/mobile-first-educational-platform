import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as certificationEndpoints from '../../../core/api/endpoints/certification.endpoints';
import type { Certificate } from '../certifications.types';

const mapCertificate = (c: certificationEndpoints.CertificateDTO): Certificate => ({
  id: c.id,
  certificateNumber: c.certificateNumber,
  technologyName: c.technologyName,
  technologySlug: c.technologySlug,
  scorePercent: c.scorePercent,
  issuedAt: c.issuedAt,
  pdfUrl: c.pdfUrl,
  status: c.status,
  priceMad: c.priceMad,
  unlockedAt: c.unlockedAt,
  paidAt: c.paidAt,
  fullName: c.fullName,
  verificationUrl: c.verificationUrl,
  courseId: c.courseId,
  courseTitle: c.courseTitle,
});

export const useCertificates = () =>
  useQuery({
    queryKey: queryKeys.certifications.all,
    queryFn: async () => {
      const data = await certificationEndpoints.getCertificates();
      return data.map(mapCertificate);
    },
  });

export const useCompletionStatus = (courseId: string) =>
  useQuery({
    queryKey: [...queryKeys.certifications.all, 'completion', courseId],
    queryFn: () => certificationEndpoints.getCompletionStatus(courseId),
    enabled: !!courseId,
  });

export const useRequestCheckout = () =>
  useMutation({
    mutationFn: (certificateId: string) => certificationEndpoints.requestCheckout(certificateId),
  });

export const useDownloadCertificate = () =>
  useMutation({
    mutationFn: (certificateId: string) => certificationEndpoints.downloadCertificate(certificateId),
  });

export const useIssueCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { courseId: string; scorePercent: number }) =>
      certificationEndpoints.issueCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certifications.all });
    },
  });
};

export const useVerifyCertificate = (number: string) =>
  useQuery({
    queryKey: [...queryKeys.certifications.all, 'verify', number],
    queryFn: () => certificationEndpoints.verifyCertificate(number),
    enabled: !!number,
  });
