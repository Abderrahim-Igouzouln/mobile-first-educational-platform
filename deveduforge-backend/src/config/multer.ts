import multer from 'multer';

const maxFileSizeMB = Number(process.env.STORAGE_MAX_FILE_SIZE_MB) || 10;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSizeMB * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = (process.env.ALLOWED_FILE_TYPES || 'image/png,image/jpeg,application/pdf').split(',');
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});
