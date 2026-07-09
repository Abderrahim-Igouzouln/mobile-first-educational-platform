import { prisma } from '../../config/database';

export class CertificationRepository {
  async findCertificatesByUser(userId: string) {
    return prisma.certificate.findMany({ where: { userId, isRevoked: false }, include: { technology: { select: { name: true } } }, orderBy: { issuedAt: 'desc' } });
  }

  async findCertificateByNumber(number: string) {
    return prisma.certificate.findUnique({ where: { certificateNumber: number }, include: { user: { select: { firstName: true, lastName: true } }, technology: { select: { name: true } } } });
  }

  async findCertificateById(id: string) {
    return prisma.certificate.findUnique({ where: { id } });
  }

  async createCertificate(data: any) {
    return prisma.certificate.create({ data });
  }

  async revokeCertificate(id: string, reason: string) {
    return prisma.certificate.update({ where: { id }, data: { isRevoked: true, revokedReason: reason } });
  }

  async createVerification(certificateId: string, ipAddress?: string, userAgent?: string) {
    return prisma.certificateVerification.create({ data: { certificateId, ipAddress, userAgent } });
  }

  async getVerificationCount(certificateId: string) {
    return prisma.certificateVerification.count({ where: { certificateId } });
  }
}
