/**
 * @module BoardMiddleware
 * @category Middlewares
 */

import * as boardService from '../services/board.js';
import { BOARD_ERRORS } from '../constants/errors.js';

/** @typedef {import('express').Request} Request */

/** @typedef {import('express').Response} Response */

/** @typedef {import('express').NextFunction} NextFunction */

/**
 * Middleware to check for existance of Board with given id
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 * @returns {Promise<void | Response>}
 */
const checkBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardService.getById(boardId);

  if (!board) {
    return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(boardId) });
  }

  return next();
};

export { checkBoard };
