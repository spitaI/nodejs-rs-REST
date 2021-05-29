import { Router, Request, Response } from 'express';

import * as taskService from '../services/task';
import { TASK_SCHEMA } from '../constants/validation';
import { TASK_ERRORS } from '../constants/errors';
import { getValidationMiddleware } from '../middlewares/validation';
import { checkBoard } from '../middlewares/board';

const validateTask = getValidationMiddleware(TASK_SCHEMA);

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(checkBoard, async (req: Request<{ boardId: string }>, res: Response) => {
    const { boardId } = req.params;
    const tasksByBoard = await taskService.getAll(boardId);
    return res.json(tasksByBoard);
  })
  .post(
    checkBoard,
    validateTask,
    async (req: Request<{ boardId: string }>, res: Response) => {
      const { boardId } = req.params;
      const newTask = await taskService.create({ ...req.body, boardId });

      if (!newTask) {
        return res.status(500).json({ message: TASK_ERRORS.HTTP_500 });
      }

      return res.status(201).json(newTask);
    }
  );

router
  .route('/:taskId')
  .get(
    checkBoard,
    async (
      req: Request<{ boardId: string; taskId: string }>,
      res: Response
    ) => {
      const { boardId, taskId } = req.params;
      const task = await taskService.getById(boardId, taskId);

      if (!task) {
        return res
          .status(404)
          .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
      }

      return res.json(task);
    }
  )
  .put(
    checkBoard,
    async (
      req: Request<{ boardId: string; taskId: string }>,
      res: Response
    ) => {
      const { boardId, taskId } = req.params;
      const updatedTask = await taskService.updateById(
        boardId,
        taskId,
        req.body
      );

      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
      }

      return res.json(updatedTask);
    }
  )
  .delete(
    async (
      req: Request<{ boardId: string; taskId: string }>,
      res: Response
    ) => {
      const { boardId, taskId } = req.params;
      const isTaskDeleted = await taskService.deleteById(boardId, taskId);

      if (!isTaskDeleted) {
        return res
          .status(404)
          .json({ message: TASK_ERRORS.HTTP_404(boardId, taskId) });
      }

      return res.sendStatus(204);
    }
  );

export default router;
