import userRouter from './user.js';
import boardRouter from './board.js';

export default app => {
  app.use('/users', userRouter);
  app.use('/boards', boardRouter);
};
