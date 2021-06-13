import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

import initRoutes from './routes';
import { COMMON_ERRORS } from './constants/errors';
import getDirname from './utils/getDirname';
import ExpressLogger from './utils/logger';

const dirname = getDirname(import.meta.url);

const logger = new ExpressLogger({
  filename: 'info.log',
  errorFilename: 'error.log',
});

const app = express();
const swaggerDocument = YAML.load(path.join(dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logger.getLogMiddleware());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

initRoutes(app);

app.use(logger.getErrorMiddleware());

app.use(
  async (_err: Error, _req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: COMMON_ERRORS.HTTP_500 });
    next();
  }
);

process.on('uncaughtException', (err: Error) => {
  const date = new Date().toISOString();
  const message = `[${date}] uncaughtException \n${err.stack}`;

  if (logger.errorPath) {
    fs.writeFileSync(logger.errorPath, message, { flag: 'a' });
  }

  logger.error(message);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  const date = new Date().toISOString();
  logger.error(`[${date}] unhandledRejection`, `\n${err.stack}`);
});

export default app;
