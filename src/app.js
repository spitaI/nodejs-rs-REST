import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import initRoutes from './routes/index.js';
import { COMMON_ERRORS } from './constants/errors.js';
import getDirname from './utils/getDirname.js';
import config from './common/config.js';

const { NODE_ENV } = config;
const __dirname = getDirname(import.meta.url);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

initRoutes(app);

app.use(async (err, req, res, _) => {
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  res.status(500).json({ message: COMMON_ERRORS.HTTP_500 });
});

export default app;
