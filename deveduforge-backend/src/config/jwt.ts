import { readFileSync } from 'fs';
import { AppError } from '../utils/errors.util';

function validateSecretEntropy(secret: string, name: string, minBytes = 32): void {
  if (!secret) throw new AppError(500, 'CONFIG_ERROR', `${name} is required`);
  if (new TextEncoder().encode(secret).length < minBytes) {
    throw new AppError(
      500,
      'CONFIG_ERROR',
      `${name} must be at least ${minBytes} bytes (current: ${new TextEncoder().encode(secret).length})`,
    );
  }
}

export const jwtConfig = (() => {
  const algorithm = process.env.JWT_ALGORITHM ?? 'HS256';

  if (algorithm === 'RS256') {
    const privateKey = process.env.JWT_PRIVATE_KEY_PATH
      ? readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8')
      : process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const publicKey = process.env.JWT_PUBLIC_KEY_PATH
      ? readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8')
      : process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n');

    if (!privateKey || !publicKey) {
      throw new AppError(500, 'CONFIG_ERROR', 'RS256 requires JWT_PRIVATE_KEY and JWT_PUBLIC_KEY');
    }

    return {
      algorithm: 'RS256' as const,
      accessSecret: privateKey,
      refreshSecret: privateKey,
      verifySecret: publicKey,
      publicKey,
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
      issuer: process.env.JWT_ISSUER || 'deveduforge.ma',
    };
  }

  const accessSecret = process.env.JWT_ACCESS_SECRET ?? '';
  const refreshSecret = process.env.JWT_REFRESH_SECRET ?? '';

  validateSecretEntropy(accessSecret, 'JWT_ACCESS_SECRET', 32);
  validateSecretEntropy(refreshSecret, 'JWT_REFRESH_SECRET', 32);

  return {
    algorithm: 'HS256' as const,
    accessSecret,
    refreshSecret,
    verifySecret: accessSecret,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    issuer: process.env.JWT_ISSUER || 'deveduforge.ma',
  };
})();
