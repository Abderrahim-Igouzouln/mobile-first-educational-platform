import { createHmac } from 'crypto';

const signingSecret = process.env.CERTIFICATE_QR_SIGNING_SECRET || 'fallback-secret';

export function signQrData(data: string): string {
  return createHmac('sha256', signingSecret).update(data).digest('hex');
}

export function verifyQrSignature(data: string, signature: string): boolean {
  const expected = signQrData(data);
  return expected === signature;
}
