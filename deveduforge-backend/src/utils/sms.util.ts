import { logger } from '../config/logger';

export async function sendSms(
  phoneNumber: string,
  message: string,
): Promise<void> {
  logger.info('SMS would be sent', { phoneNumber, message });
}
