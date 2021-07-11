import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../common/config';
import { JWT_EXPIRES_TERM } from '../constants/auth';

export const getSignedJWTToken = (userId: string, login: string): string =>
  jwt.sign({ userId, login }, config().JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_TERM,
  });

export const verifySignedJWTToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, config().JWT_SECRET as string);
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
