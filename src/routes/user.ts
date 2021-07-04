import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as userService from '../services/user';
import { USER_SCHEMA } from '../constants/validation';
import { USER_ERRORS } from '../constants/errors';
import { getValidationMiddleware } from '../middlewares/validation';
import { checkUserExist } from '../middlewares/checkUserExist';

const { CREATED, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = StatusCodes;

const validateUser = getValidationMiddleware(USER_SCHEMA);

const router = Router();

router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    const users = await userService.getAll();
    return res.json(users);
  })
  .post(validateUser, checkUserExist, async (req: Request, res: Response) => {
    const newUser = await userService.create(req.body);

    if (!newUser) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: USER_ERRORS.HTTP_500 });
    }

    return res.status(CREATED).json(newUser);
  });

router
  .route('/:id')
  .get(async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: USER_ERRORS.HTTP_404(id) });
    }

    return res.json(user);
  })
  .put(validateUser, async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const updatedUser = await userService.updateById(id, req.body);

    if (!updatedUser) {
      return res.status(NOT_FOUND).json({ message: USER_ERRORS.HTTP_404(id) });
    }

    return res.json(updatedUser);
  })
  .delete(async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const isUserDeleted = await userService.deleteById(id);

    if (!isUserDeleted) {
      return res.status(NOT_FOUND).json({ message: USER_ERRORS.HTTP_404(id) });
    }

    return res.sendStatus(NO_CONTENT);
  });

export default router;
