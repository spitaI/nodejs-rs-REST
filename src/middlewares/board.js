import * as boardService from '../services/board.js';
import { BOARD_ERRORS } from '../constants/errors.js';

/**
 * Middleware to check for existance of Board with given id
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next function
 * @returns {Promise<void | import('express').Response>}
 */
export const checkBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardService.getById(boardId);

  if (!board) {
    return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(boardId) });
  }

  return next();
};
