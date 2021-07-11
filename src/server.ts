import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';

import { AppModule } from './app';
import ExpressLogger from './utils/logger';
import { LoggerGuard } from './guards/loggerGuard';
import { ErrorFilter } from './exception-filters/errorFilter';
import { UserService } from './services/user';

let logger: ExpressLogger;

process.on('uncaughtException', (err: Error) => {
  const date = new Date().toISOString();
  const message = `[${date}] uncaughtException \n${err.stack}`;

  if (logger?.errorPath) {
    fs.writeFileSync(logger.errorPath, message, { flag: 'a' });
  }

  logger?.error(message);
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  const date = new Date().toISOString();
  const message = `[${date}] unhandledRejection \n${err.stack}`;

  if (logger?.errorPath) {
    fs.writeFileSync(logger.errorPath, message, { flag: 'a' });
  }

  logger?.error(message);
  process.exit(1);
});

(async () => {
  const useFastify = new ConfigService().get('USE_FASTIFY') === 'true';
  const adapter = useFastify ? new FastifyAdapter() : new ExpressAdapter();

  const app = await NestFactory.create(AppModule, adapter);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logsDirname = configService.get('LOGS_DIRNAME');

  logger = new ExpressLogger({
    filename: 'info.log',
    errorFilename: 'error.log',
    dirname: logsDirname,
  });

  app.useLogger(logger);
  app.useGlobalGuards(new LoggerGuard(logger));
  app.useGlobalFilters(new ErrorFilter(logger));

  const userService = app.get(UserService);
  userService.verifyAdminUser();

  const apiDocs = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, apiDocs);

  const listenCb = () => {
    const adapterName = useFastify ? 'fastify' : 'express';
    process.stdout.write(
      `App is running on http://localhost:${port} using ${adapterName}\n`
    );
  };

  if (useFastify) {
    await app.listen(port, '0.0.0.0', listenCb);
  } else {
    await app.listen(port, listenCb);
  }
})();
