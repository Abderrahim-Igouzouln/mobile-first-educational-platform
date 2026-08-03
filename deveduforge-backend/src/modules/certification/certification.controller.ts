import { Request, Response, NextFunction } from 'express';
import { CertificationService } from './certification.service';
import { sendSuccess, sendCreated } from '../../utils/response/apiResponse.util';

const certificationService = new CertificationService();

export async function getCertificates(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const certs = await certificationService.getCertificates(req.user!.id);
    sendSuccess(res, certs);
  } catch (err) { next(err); }
}

export async function getCompletionStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await certificationService.getCourseCompletionStatus(req.user!.id, req.params.courseId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function requestCheckout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await certificationService.requestCheckout(req.user!.id, req.params.id);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function downloadCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await certificationService.generateAndDownloadPdf(req.user!.id, req.params.id);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function issueCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cert = await certificationService.issueCertificate(req.user!.id, req.body.courseId, req.body.scorePercent);
    sendCreated(res, cert);
  } catch (err) { next(err); }
}

export async function verifyCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await certificationService.verifyCertificate(req.params.number, req.ip, req.headers['user-agent']);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function revokeCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await certificationService.revokeCertificate(req.params.id, req.body.reason);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}
