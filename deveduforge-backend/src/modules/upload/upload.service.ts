import path from 'path';
import fs from 'fs/promises';
import { generateStorageKey } from '../../utils/helpers/fileUpload.util';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
const BASE_URL = process.env.UPLOAD_BASE_URL || 'http://localhost:4000/uploads';

export class UploadService {
  async ensureUploadDir(subDir: string): Promise<string> {
    const dir = path.join(UPLOAD_DIR, subDir);
    await fs.mkdir(dir, { recursive: true });
    return dir;
  }

  async saveFile(file: Express.Multer.File, subDir = 'general'): Promise<{ url: string; key: string }> {
    const dir = await this.ensureUploadDir(subDir);
    const storageKey = generateStorageKey(file.originalname);
    const safePath = path.join(dir, storageKey);

    if (!safePath.startsWith(UPLOAD_DIR)) {
      throw new Error('Path traversal detected');
    }

    await fs.writeFile(safePath, file.buffer);
    return { url: `${BASE_URL}/${subDir}/${storageKey}`, key: storageKey };
  }

  async deleteFile(key: string, subDir = 'general'): Promise<void> {
    const safePath = path.join(UPLOAD_DIR, subDir, key);
    if (!safePath.startsWith(UPLOAD_DIR)) {
      throw new Error('Path traversal detected');
    }
    await fs.unlink(safePath).catch(() => {});
  }
}
