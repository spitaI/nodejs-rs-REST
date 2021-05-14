import userRouter from './user.js';
import boardRouter from './board.js';
import taskRouter from './task.js';

export default app => {
  app.use('/users', userRouter);
  app.use('/boards', boardRouter);
  app.use('/boards/:boardId/tasks', taskRouter);
};
