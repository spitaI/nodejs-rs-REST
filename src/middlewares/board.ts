import { Request, Response, NextFunction } from 'express';

import * as boardService from '../services/board';
import { BOARD_ERRORS } from '../constants/errors';

export const checkBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { boardId = '' } = req.params;
  const board = await boardService.getById(boardId);

  if (!board) {
    return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(boardId) });
  }

  return next();
};
