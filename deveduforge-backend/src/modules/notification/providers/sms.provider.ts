import { sendSms } from '../../../utils/communication/sms.util';

export class SmsProvider {
  async send(phoneNumber: string, message: string): Promise<void> {
    await sendSms(phoneNumber, message);
  }
}
