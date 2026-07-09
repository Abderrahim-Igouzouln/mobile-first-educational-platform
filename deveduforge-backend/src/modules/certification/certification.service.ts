import crypto from 'crypto';
import { CertificationRepository } from './certification.repository';
import { NotFoundError, ForbiddenError } from '../../utils/errors.util';

const repo = new CertificationRepository();
const QR_SECRET = process.env.CERTIFICATE_QR_SECRET || 'deveduforge-qr-secret';

export class CertificationService {
  private generateCertificateNumber(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `DEF-${ts}-${rand}`;
  }

  private generateQrData(certificateId: string, number: string): string {
    const data = `${certificateId}:${number}`;
    const hmac = crypto.createHmac('sha256', QR_SECRET).update(data).digest('hex');
    return JSON.stringify({ id: certificateId, number, sig: hmac });
  }

  async getCertificates(userId: string) {
    const certs = await repo.findCertificatesByUser(userId);
    return certs.map((c) => ({
      id: c.id, certificateNumber: c.certificateNumber, technologyName: c.technology.name,
      scorePercent: c.scorePercent, issuedAt: c.issuedAt, pdfUrl: c.pdfUrl,
    }));
  }

  async issueCertificate(userId: string, technologyId: string, scorePercent: number) {
    const number = this.generateCertificateNumber();
    const cert = await repo.createCertificate({
      certificateNumber: number, userId, technologyId, scorePercent,
      qrCodeData: '',
    });
    const qrCodeData = this.generateQrData(cert.id, number);
    return repo.createCertificate({ certificateNumber: number, userId, technologyId, scorePercent, qrCodeData });
  }

  async verifyCertificate(number: string, ipAddress?: string, userAgent?: string) {
    const cert = await repo.findCertificateByNumber(number);
    if (!cert) throw new NotFoundError('Certificat introuvable.');
    if (cert.isRevoked) throw new ForbiddenError('Ce certificat a été révoqué.');

    const verificationCount = await repo.getVerificationCount(cert.id);
    await repo.createVerification(cert.id, ipAddress, userAgent);

    return {
      valid: true, certificateNumber: cert.certificateNumber,
      fullName: `${cert.user.firstName} ${cert.user.lastName}`,
      technology: cert.technology.name, scorePercent: cert.scorePercent,
      issuedAt: cert.issuedAt, isRevoked: cert.isRevoked,
      timesVerified: verificationCount + 1,
    };
  }

  async revokeCertificate(certificateId: string, reason: string) {
    const cert = await repo.findCertificateById(certificateId);
    if (!cert) throw new NotFoundError('Certificat introuvable.');
    return repo.revokeCertificate(certificateId, reason);
  }
}
