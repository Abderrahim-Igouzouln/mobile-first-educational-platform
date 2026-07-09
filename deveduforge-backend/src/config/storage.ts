export const storageConfig = {
  endpoint: process.env.STORAGE_ENDPOINT || '',
  region: process.env.STORAGE_REGION || 'fr-par',
  bucket: process.env.STORAGE_BUCKET || 'deveduforge-dev',
  accessKey: process.env.STORAGE_ACCESS_KEY || '',
  secretKey: process.env.STORAGE_SECRET_KEY || '',
  maxFileSizeMB: Number(process.env.STORAGE_MAX_FILE_SIZE_MB) || 10,
};
