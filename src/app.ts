import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import initRoutes from './routes';
import { COMMON_ERRORS } from './constants/errors';
import getDirname from './utils/getDirname';
import config from './common/config';

const { NODE_ENV } = config;
const dirname = getDirname(import.meta.url);

const app = express();
const swaggerDocument = YAML.load(path.join(dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

initRoutes(app);

app.use(
  async (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (NODE_ENV === 'development') {
      process.stderr.write(`${err.stack}\n`);
    }
    res.status(500).json({ message: COMMON_ERRORS.HTTP_500 });
    next();
  }
);

export default app;
