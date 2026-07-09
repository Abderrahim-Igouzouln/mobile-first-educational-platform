import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { JwtAccessPayload, JwtRefreshPayload } from '../types/jwt.types';

export function signAccessToken(payload: Omit<JwtAccessPayload, 'type' | 'iat' | 'exp' | 'iss'>): string {
  const options: jwt.SignOptions = {
    expiresIn: jwtConfig.accessExpiresIn as jwt.SignOptions['expiresIn'],
    issuer: jwtConfig.issuer,
    algorithm: jwtConfig.algorithm as jwt.Algorithm,
  };
  return jwt.sign({ ...payload, type: 'access' }, jwtConfig.accessSecret, options);
}

export function signRefreshToken(payload: Omit<JwtRefreshPayload, 'type' | 'iat' | 'exp' | 'iss'>): string {
  const options: jwt.SignOptions = {
    expiresIn: jwtConfig.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    issuer: jwtConfig.issuer,
    algorithm: jwtConfig.algorithm as jwt.Algorithm,
  };
  return jwt.sign({ ...payload, type: 'refresh' }, jwtConfig.refreshSecret, options);
}

export function verifyAccessToken(token: string): JwtAccessPayload {
  return jwt.verify(token, jwtConfig.verifySecret, {
    issuer: jwtConfig.issuer,
    algorithms: [jwtConfig.algorithm as jwt.Algorithm],
  }) as JwtAccessPayload;
}

export function verifyRefreshToken(token: string): JwtRefreshPayload {
  return jwt.verify(token, jwtConfig.refreshSecret, {
    issuer: jwtConfig.issuer,
    algorithms: [jwtConfig.algorithm as jwt.Algorithm],
  }) as JwtRefreshPayload;
}
