import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as certificationEndpoints from '../../../core/api/endpoints/certification.endpoints';
import type { Certificate } from '../certifications.types';

const mapCertificate = (c: certificationEndpoints.Certificate): Certificate => ({
  id: c.id,
  technologyId: c.technologyId,
  technologyName: c.technologyName,
  technologyIcon: 'Award',
  level: 'debutant',
  fullName: '',
  issueDate: c.issuedAt,
  certificateNumber: c.number,
  score: 0,
  totalQuestions: 0,
  pdfUrl: c.downloadUrl,
  verificationUrl: `/certifications/verify/${c.number}`,
});

export const useCertificates = () =>
  useQuery({
    queryKey: queryKeys.certifications.all,
    queryFn: async () => {
      const data = await certificationEndpoints.getCertificates();
      return data.map(mapCertificate);
    },
  });

export const useIssueCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (technologyId: string) =>
      certificationEndpoints.issueCertificate({ technologyId }),
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
