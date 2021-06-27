import jwt from 'jsonwebtoken';

import config from '../common/config';
import { JWT_EXPIRES_TERM } from '../constants/auth';

const { JWT_SECRET } = config;

export const getSignedJWTToken = (userId: string, login: string): string =>
  jwt.sign({ userId, login }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_TERM,
  });
