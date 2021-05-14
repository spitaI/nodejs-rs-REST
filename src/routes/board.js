import { Router } from 'express';

import * as boardService from '../services/board.js';
import { BOARD_SCHEMA } from '../constants/validation.js';
import { BOARD_ERRORS } from '../constants/errors.js';
import { getValidationMiddleware } from '../middlewares/validation.js';

const validateBoard = getValidationMiddleware(BOARD_SCHEMA);

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();
    return res.json(boards);
  })
  .post(validateBoard, async (req, res) => {
    const newBoard = await boardService.create(req.body);

    if (!newBoard) {
      return res.status(500).json({ message: BOARD_ERRORS.HTTP_500 });
    }

    return res.status(201).json(newBoard);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);

    if (!board) {
      return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(id) });
    }

    return res.json(board);
  })
  .put(validateBoard, async (req, res) => {
    const { id } = req.params;
    const updatedBoard = await boardService.updateById(id, req.body);

    if (!updatedBoard) {
      return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(id) });
    }

    return res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const isBoardDeleted = await boardService.deleteById(id);

    if (!isBoardDeleted) {
      return res.status(404).json({ message: BOARD_ERRORS.HTTP_404(id) });
    }

    return res.sendStatus(204);
  });

export default router;
