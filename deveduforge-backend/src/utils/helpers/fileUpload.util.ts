import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export function generateStorageKey(originalName: string): string {
  const ext = path.extname(originalName).replace(/['"]/g, '').replace(/\./g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  return `${uuidv4()}.${ext}`;
}

export function getMimeType(bytes: Buffer): string {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'image/png';
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
  if (bytes[0] === 0x25 && bytes[1] === 0x50) return 'application/pdf';
  return 'application/octet-stream';
}
