import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app';
import ExpressLogger from './utils/logger';
import { LoggerGuard } from './guards/loggerGuard';
import { ErrorFilter } from './exception-filters/errorFilter';
import { UserService } from './services/user';

(async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logsDirname = configService.get('LOGS_DIRNAME');

  const logger = new ExpressLogger({
    filename: 'info.log',
    errorFilename: 'error.log',
    dirname: logsDirname,
  });

  app.useLogger(logger);
  app.useGlobalGuards(new LoggerGuard(logger));
  app.useGlobalFilters(new ErrorFilter(logger));

  const userService = app.get(UserService);
  userService.verifyAdminUser();

  await app.listen(port);
})();
