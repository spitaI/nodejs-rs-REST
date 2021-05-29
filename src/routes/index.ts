import { Application } from 'express';

import userRouter from './user';
import boardRouter from './board';
import taskRouter from './task';

export default (app: Application): void => {
  app.use('/users', userRouter);
  app.use('/boards', boardRouter);
  app.use('/boards/:boardId/tasks', taskRouter);
};
