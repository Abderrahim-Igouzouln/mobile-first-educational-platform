import { logger } from '../../config/app/logger';

export async function sendSms(
  phoneNumber: string,
  message: string,
): Promise<void> {
  logger.info('SMS would be sent', { phoneNumber, message });
}
