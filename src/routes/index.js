import userRouter from './user.js';

export default app => {
  app.use('/users', userRouter);
};
