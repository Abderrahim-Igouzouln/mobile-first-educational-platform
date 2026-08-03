import crypto from 'crypto';
import { CertificationRepository } from './certification.repository';
import { prisma } from '../../config/database/prisma';
import { NotFoundError, ForbiddenError, ConflictError } from '../../utils/response/errors.util';
import { PdfGeneratorService } from './services/pdfGenerator.service';

const repo = new CertificationRepository();
const pdfService = new PdfGeneratorService();
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
    const existingCourseIds = new Set(certs.map((c: any) => c.courseId));

    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: { technology: { select: { name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const lockedCerts = courses
      .filter((course) => !existingCourseIds.has(course.id))
      .map((course: any) => ({
        id: `locked-${course.id}`,
        certificateNumber: '',
        technologyName: course.technology.name,
        technologySlug: course.technology.slug,
        scorePercent: 0,
        issuedAt: null,
        pdfUrl: null,
        status: 'locked',
        priceMad: 29,
        unlockedAt: null,
        paidAt: null,
        fullName: '',
        verificationUrl: '',
        courseId: course.id,
        courseTitle: course.title,
      }));

    const mappedCerts = certs.map((c: any) => ({
      id: c.id,
      certificateNumber: c.certificateNumber,
      technologyName: c.technology.name,
      technologySlug: (c.technology as any).slug,
      scorePercent: c.scorePercent,
      issuedAt: c.issuedAt,
      pdfUrl: c.pdfUrl,
      status: c.status,
      priceMad: Number(c.priceMad),
      unlockedAt: c.unlockedAt,
      paidAt: c.paidAt,
      fullName: `${c.user.firstName} ${c.user.lastName}`,
      verificationUrl: `${process.env.API_URL || 'http://localhost:4000'}/api/certifications/certificates/verify/${c.certificateNumber}`,
      courseId: c.courseId,
      courseTitle: c.course?.title || '',
    }));

    return [...lockedCerts, ...mappedCerts];
  }

  async getCourseCompletionStatus(userId: string, courseId: string) {
    const course = await prisma.course.findUniqueOrThrow({
      where: { id: courseId },
      include: { lessons: { include: { exercises: true } }, projects: true },
    });

    const lessonIds = course.lessons.map((l: any) => l.id);
    const completedLessons = await prisma.userProgress.count({
      where: { userId, lessonId: { in: lessonIds }, status: 'completed' },
    });

    const exerciseIds = course.lessons.flatMap((l: any) => l.exercises.map((e: any) => e.id));
    const passedExercises = exerciseIds.length > 0
      ? (await prisma.exerciseResult.groupBy({
          by: ['exerciseId'],
          where: { userId, exerciseId: { in: exerciseIds }, passed: true },
        })).length
      : 0;

    const projectIds = course.projects.map((p: any) => p.id);
    let projectApproved = projectIds.length === 0;
    if (!projectApproved) {
      const approvedSubmissions = await prisma.projectSubmission.findMany({
        where: { userId, projectId: { in: projectIds } },
        include: { reviews: { orderBy: { reviewedAt: 'desc' }, take: 1 } },
      });
      projectApproved = approvedSubmissions.some((s) => s.reviews[0]?.score >= 70);
    }

    return {
      lessonsCompleted: completedLessons,
      lessonsTotal: lessonIds.length,
      exercisesPassed: passedExercises,
      exercisesTotal: exerciseIds.length,
      projectApproved,
      isComplete:
        completedLessons === lessonIds.length &&
        passedExercises === exerciseIds.length &&
        projectApproved,
    };
  }

  async checkAndUnlockCertificate(userId: string, courseId: string) {
    const status = await this.getCourseCompletionStatus(userId, courseId);
    if (!status.isComplete) return { unlocked: false, status };

    const course = await prisma.course.findUniqueOrThrow({ where: { id: courseId } });

    await prisma.certificate.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { status: 'unlocked', unlockedAt: new Date() },
      create: {
        userId,
        courseId,
        technologyId: course.technologyId,
        certificateNumber: this.generateCertificateNumber(),
        qrCodeData: '',
        scorePercent: 100,
        status: 'unlocked',
        unlockedAt: new Date(),
      },
    });

    return { unlocked: true, status };
  }

  async issueCertificate(userId: string, courseId: string, scorePercent: number) {
    const course = await prisma.course.findUniqueOrThrow({ where: { id: courseId } });
    const number = this.generateCertificateNumber();
    const cert = await repo.createCertificate({
      certificateNumber: number,
      userId,
      courseId,
      technologyId: course.technologyId,
      scorePercent,
      qrCodeData: '',
      status: 'unlocked',
      unlockedAt: new Date(),
    });
    const qrCodeData = this.generateQrData(cert.id, number);
    return prisma.certificate.update({
      where: { id: cert.id },
      data: { qrCodeData },
    });
  }

  async requestCheckout(userId: string, certificateId: string) {
    const cert = await repo.findCertificateById(certificateId);
    if (!cert) throw new NotFoundError('Certificat introuvable.');
    if (cert.userId !== userId) throw new ForbiddenError('Ce certificat ne vous appartient pas.');
    if (cert.status === 'paid') throw new ConflictError('Ce certificat a déjà été payé.');
    if (cert.status !== 'unlocked') throw new ForbiddenError('Ce certificat n\'est pas encore débloqué.');

    return {
      id: cert.id,
      certificateNumber: cert.certificateNumber,
      amountMad: Number(cert.priceMad),
      currency: 'MAD',
    };
  }

  async generateAndDownloadPdf(userId: string, certificateId: string) {
    const cert = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: { user: true, course: true },
    });

    if (!cert) throw new NotFoundError('Certificat introuvable.');
    if (cert.userId !== userId) throw new ForbiddenError('Accès refusé.');
    if (cert.status !== 'paid') throw new ForbiddenError('Veuillez d\'abord payer le certificat.');

    if (!cert.pdfUrl) {
      const pdfBuffer = pdfService.generateCertificate({
        recipientName: `${cert.user.firstName} ${cert.user.lastName}`,
        technologyName: cert.course.title,
        scorePercent: cert.scorePercent,
        certificateNumber: cert.certificateNumber,
        issuedAt: cert.issuedAt,
      });

      const bufferStr = pdfBuffer.toString('base64');
      return { pdfData: bufferStr, contentType: 'application/pdf', fileName: `certificat-${cert.certificateNumber}.pdf` };
    }

    return { pdfUrl: cert.pdfUrl, contentType: 'application/pdf', fileName: `certificat-${cert.certificateNumber}.pdf` };
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
