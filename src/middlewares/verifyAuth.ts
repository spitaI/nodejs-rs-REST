import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  getAuthorizationToken,
  verifySignedJWTToken,
  isIgnoreAuth,
} from '../utils/auth';
import { AUTH_ERRORS } from '../constants/errors';

const { UNAUTHORIZED } = StatusCodes;

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const url = req.baseUrl + req.path;
  if (isIgnoreAuth(url)) {
    return next();
  }

  const token = getAuthorizationToken(req.headers.authorization);
  if (!token || !verifySignedJWTToken(token)) {
    return res.status(UNAUTHORIZED).json({ message: AUTH_ERRORS.HTTP_401 });
  }

  return next();
};
