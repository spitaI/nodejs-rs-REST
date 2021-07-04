import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as userService from '../services/user';
import { USER_ERRORS } from '../constants/errors';

const { BAD_REQUEST } = StatusCodes;

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { login } = req.body;
  const existingUser = await userService.getByUsername(login);

  if (existingUser) {
    return res
      .status(BAD_REQUEST)
      .json({ message: USER_ERRORS.HTTP_400(login) });
  }

  return next();
};
