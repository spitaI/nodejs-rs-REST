import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as authService from '../services/auth';
import { AUTH_ERRORS } from '../constants/errors';

const { BAD_REQUEST, FORBIDDEN } = StatusCodes;

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(BAD_REQUEST).json({ message: AUTH_ERRORS.HTTP_400 });
  }

  const token = await authService.logIn({ login, password });
  if (!token) {
    return res.status(FORBIDDEN).json({ message: AUTH_ERRORS.HTTP_403 });
  }

  return res.json({ token });
});

export default router;
