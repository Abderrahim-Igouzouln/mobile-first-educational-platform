import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import { jwtConfig } from '../../../config/security/jwt';
import { Request } from 'express';

const opts: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
  secretOrKey: jwtConfig.refreshSecret,
  issuer: jwtConfig.issuer,
  algorithms: [jwtConfig.algorithm as 'HS256' | 'HS384' | 'HS512'],
  passReqToCallback: true,
};

export const refreshTokenStrategy = new JwtStrategy(opts, async (_req: Request, _payload: unknown, done: (err: Error | null, user?: unknown) => void) => {
  done(null, _payload);
});
