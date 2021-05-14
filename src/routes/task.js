import { Router } from 'express';

import * as taskService from '../services/task.js';
import { TASK_SCHEMA } from '../constants/validation.js';
import { TASK_ERRORS } from '../constants/errors.js';
import { getValidationMiddleware } from '../middlewares/validation.js';
import { checkBoard } from '../middlewares/board.js';

const validateTask = getValidationMiddleware(TASK_SCHEMA);

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(checkBoard, async (req, res) => {
    const { boardId } = req.params;
    const tasksByBoard = await taskService.getAll(boardId);
    return res.json(tasksByBoard);
  })
  .post(checkBoard, validateTask, async (req, res) => {
    const { boardId } = req.params;
    const newTask = await taskService.create({ ...req.body, boardId });

    if (!newTask) {
      return res.status(500).json({ message: TASK_ERRORS.HTTP_500 });
    }

    return res.status(201).json(newTask);
  });

router
  .route('/:taskId')
  .get(checkBoard, async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getById(boardId, taskId);

    if (!task) {
      return res
        .status(404)
        .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
    }

    return res.json(task);
  })
  .put(checkBoard, async (req, res) => {
    const { boardId, taskId } = req.params;
    const updatedTask = await taskService.updateById(boardId, taskId, req.body);

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
    }

    return res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    const isTaskDeleted = await taskService.deleteById(boardId, taskId);

    if (!isTaskDeleted) {
      return res
        .status(404)
        .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
    }

    return res.sendStatus(204);
  });

export default router;
