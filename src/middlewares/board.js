import * as boardService from '../services/board.js';
import { BOARD_ERRORS } from '../constants/errors.js';

export const checkBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardService.getById(boardId);

  if (!board) {
    return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(boardId) });
  }

  return next();
};
