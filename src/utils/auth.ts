import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../common/config';
import { JWT_EXPIRES_TERM, IGNORE_AUTHORIZATION_URLS } from '../constants/auth';

const { JWT_SECRET } = config;

export const getSignedJWTToken = (userId: string, login: string): string =>
  jwt.sign({ userId, login }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_TERM,
  });

export const verifySignedJWTToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET as string);
  } catch (e) {
    return '';
  }
};

export const getAuthorizationToken = (authHeader?: string): string | null => {
  if (!authHeader) {
    return null;
  }

  const [authSchema, token] = authHeader.split(' ');
  if (authSchema !== 'Bearer') {
    return null;
  }

  return token ?? null;
};

export const isIgnoreAuth = (url: string): boolean =>
  IGNORE_AUTHORIZATION_URLS.some(pattern => new RegExp(pattern).test(url));
