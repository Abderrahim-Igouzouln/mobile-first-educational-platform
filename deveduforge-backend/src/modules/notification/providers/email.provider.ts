import { sendEmail } from '../../../utils/email.util';

export class EmailProvider {
  async send(to: string, subject: string, htmlBody: string): Promise<void> {
    await sendEmail(to, subject, htmlBody);
  }
}
