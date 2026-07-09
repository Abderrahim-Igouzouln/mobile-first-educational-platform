import { Request, Response, NextFunction } from 'express';
import { UploadService } from './upload.service';
import { sendCreated } from '../../utils/apiResponse.util';

const uploadService = new UploadService();

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: { code: 'NO_FILE', message: 'Aucun fichier fourni.' } });
      return;
    }
    const subDir = (req.body.subDir as string) || 'general';
    const result = await uploadService.saveFile(req.file, subDir);
    sendCreated(res, result);
  } catch (err) {
    next(err);
  }
}

export async function uploadMultiple(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      res.status(400).json({ success: false, error: { code: 'NO_FILES', message: 'Aucun fichier fourni.' } });
      return;
    }
    const subDir = (req.body.subDir as string) || 'general';
    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map(file => uploadService.saveFile(file, subDir)),
    );
    sendCreated(res, results);
  } catch (err) {
    next(err);
  }
}
