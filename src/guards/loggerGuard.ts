import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import chalk from 'chalk';

import ExpressLogger from '../utils/logger';

@Injectable()
export class LoggerGuard implements CanActivate {
  constructor(private logger: ExpressLogger) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();
    const res = ctx.getResponse();

    const timeStart = Date.now();

    const host = req.get?.('host') ?? req.hostname;
    const url = `${req.protocol}://${host}${req.url}`;
    const queryParams = JSON.stringify(req.query);
    const date = new Date().toISOString();
    const body = JSON.stringify(req.body ?? {});

    const onFinished = () => {
      const timeDelta = Date.now() - timeStart;

      this.logger.log(
        `[${chalk.gray(date)}]`,
        `${chalk.greenBright(req.method)}`,
        `${url}`,
        `${chalk.magenta('QUERY')}: ${queryParams}`,
        `${chalk.magenta('BODY')}: ${body}`,
        ExpressLogger.formatStatusCode(res.statusCode),
        `${timeDelta}ms`
      );
    };

    if (!res.on) {
      res.raw.on('finish', onFinished);
    } else {
      res.on('finish', onFinished);
    }

    return true;
  }
}
