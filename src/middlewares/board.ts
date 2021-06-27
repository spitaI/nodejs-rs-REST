import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as boardService from '../services/board';
import { BOARD_ERRORS } from '../constants/errors';

const { NOT_FOUND } = StatusCodes;

export const checkBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { boardId = '' } = req.params;
  const board = await boardService.getById(boardId);

  if (!board) {
    return res
      .status(NOT_FOUND)
      .json({ message: BOARD_ERRORS.HTTP_404(boardId) });
  }

  return next();
};
