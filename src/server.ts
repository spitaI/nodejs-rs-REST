import { Connection } from 'typeorm';

import app from './app';
import config from './common/config';
import * as userService from './services/user';
import ExpressLogger from './utils/logger';
import { connect } from './utils/dbConnect';

const { PORT, NODE_ENV, LOGS_DIRNAME } = config;

connect({
  logger: new ExpressLogger({
    filename: 'info.log',
    errorFilename: 'error.log',
    dirname: LOGS_DIRNAME,
  }),
})
  .then((connection: Connection) => connection.runMigrations())
  .then(userService.verifyAdminUser)
  .then(() => {
    app.listen(PORT, () => {
      if (NODE_ENV === 'development') {
        process.stdout.write(`App is running on http://localhost:${PORT}\n`);
      }
    });
  });
