import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.port === 465,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
): Promise<void> {
  try {
    await transporter.sendMail({
      from: emailConfig.from,
      to,
      subject,
      html: htmlBody,
    });
    logger.info('Email sent', { to, subject });
  } catch (error) {
    logger.error('Failed to send email', { to, subject, error });
    throw error;
  }
}
