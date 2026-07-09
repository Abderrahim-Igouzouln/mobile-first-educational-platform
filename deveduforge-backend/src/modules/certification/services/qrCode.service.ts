import QRCode from 'qrcode';
import { signQrData } from '../../../utils/qrSignature.util';

export class QrCodeService {
  async generateQrCode(certificateNumber: string): Promise<string> {
    const baseUrl = process.env.CERTIFICATE_VERIFY_BASE_URL || '';
    const signature = signQrData(certificateNumber);
    const verificationUrl = `${baseUrl}/api/v1/certificates/verify/${certificateNumber}?sig=${signature}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl);
    return qrDataUrl;
  }
}
