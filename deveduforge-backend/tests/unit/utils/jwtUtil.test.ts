import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../../../src/utils/jwt.util';
import { jwtConfig } from '../../../src/config/jwt';

describe('JWT Utility', () => {
  const accessPayload = { sub: 'user-123', role: 'student' as const, email: 'test@test.com', locale: 'fr', emailVerifiedAt: new Date().toISOString() };
  const refreshPayload = { sub: 'user-123', role: 'student' as const, tokenId: 'tok-abc' };

  it('signs and verifies an access token', () => {
    const token = signAccessToken(accessPayload);
    expect(typeof token).toBe('string');

    const decoded = verifyAccessToken(token);
    expect(decoded.sub).toBe(accessPayload.sub);
    expect(decoded.role).toBe(accessPayload.role);
    expect(decoded.type).toBe('access');
    expect(decoded.iss).toBe(jwtConfig.issuer);
  });

  it('signs and verifies a refresh token', () => {
    const token = signRefreshToken(refreshPayload);
    expect(typeof token).toBe('string');

    const decoded = verifyRefreshToken(token);
    expect(decoded.sub).toBe(refreshPayload.sub);
    expect(decoded.type).toBe('refresh');
  });

  it('rejects a tampered token', () => {
    const token = signAccessToken(accessPayload);
    const tampered = token.slice(0, -5) + 'xxxxx';
    expect(() => verifyAccessToken(tampered)).toThrow();
  });

  it('rejects an expired token', () => {
    const token = signAccessToken(accessPayload);
    jest.useFakeTimers({ advanceTimers: true });
    jest.advanceTimersByTime(20 * 60 * 1000);
    expect(() => verifyAccessToken(token)).toThrow();
    jest.useRealTimers();
  });
});
