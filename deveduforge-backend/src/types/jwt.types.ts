export interface JwtAccessPayload {
  sub: string;
  email: string;
  role: string;
  locale: string;
  emailVerifiedAt: string | null;
  type: 'access';
  iat?: number;
  exp?: number;
  iss?: string;
}

export interface JwtRefreshPayload {
  sub: string;
  tokenId: string;
  type: 'refresh';
  iat?: number;
  exp?: number;
  iss?: string;
}
