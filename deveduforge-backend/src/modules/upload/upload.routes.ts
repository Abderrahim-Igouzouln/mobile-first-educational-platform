import { Router } from 'express';
import { extractUser } from '../auth/auth.middleware';
import { upload } from '../../config/multer';
import * as uploadController from './upload.controller';

const router = Router();

router.post('/file', extractUser, upload.single('file'), uploadController.uploadFile);
router.post('/multiple', extractUser, upload.array('files', 10), uploadController.uploadMultiple);

export default router;
