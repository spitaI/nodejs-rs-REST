import { Request, Response, NextFunction } from 'express';
import fs, { WriteStream } from 'fs';
import path from 'path';
import chalk from 'chalk';

import config from '../common/config';
import { DEFAULT_LOG_DIRNAME } from '../constants/logger';

export type LoggerOptions = {
  filename?: string;
  errorFilename?: string;
  dirname?: string | false;
};

const { APP_ROOT } = config;

class ExpressLogger {
  private logStream: WriteStream | null;

  private errorLogStream: WriteStream | null;

  private static getWriteStream(logPath?: string): WriteStream | null {
    if (!logPath) return null;
    return fs.createWriteStream(logPath, { flags: 'a' });
  }

  private static getLogsPath(
    filename?: string,
    errorFilename?: string,
    dirname?: string | false
  ): [string, string] {
    if (!filename && !errorFilename) return ['', ''];

    const logDirname =
      dirname === false ? APP_ROOT : dirname ?? DEFAULT_LOG_DIRNAME;

    if (dirname !== false && !fs.existsSync(logDirname)) {
      fs.mkdirSync(logDirname);
    }

    const logPath = filename ? path.join(logDirname, filename) : '';
    const errorPath = errorFilename ? path.join(logDirname, errorFilename) : '';
    return [logPath, errorPath];
  }

  private static formatStatusCode(statusCode: number) {
    const code = `${statusCode}`;

    if (code.startsWith('2')) return chalk.green(code);
    if (code.startsWith('3')) return chalk.cyan(code);
    return chalk.red(code);
  }

  private static clearColor(str: string): string {
    return str.replace(/\[\d+m/g, '');
  }

  constructor(opts?: LoggerOptions) {
    const { dirname, filename, errorFilename } = opts || {};

    const [logPath, errorPath] = ExpressLogger.getLogsPath(
      filename,
      errorFilename,
      dirname
    );
    this.logStream = ExpressLogger.getWriteStream(logPath);
    this.errorLogStream = ExpressLogger.getWriteStream(errorPath);
  }

  log(...message: string[]): void {
    const msg = `${message.join(' ')}\n`;

    process.stdout.write(msg);
    this.logStream?.write(ExpressLogger.clearColor(msg));
  }

  error(...errorMessage: string[]): void {
    const errMsg = `${errorMessage.join(' ')}\n`;

    process.stderr.write(errMsg);
    this.errorLogStream?.write(ExpressLogger.clearColor(errMsg));
  }

  getLogMiddleware() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const queryParams = JSON.stringify(req.query);
      const body = JSON.stringify(req.body);
      const date = new Date().toISOString();

      const timeStart = Date.now();

      res.on('finish', () => {
        const timeDelta = Date.now() - timeStart;
        this.log(
          `[${chalk.gray(date)}]`,
          `${chalk.greenBright(req.method)}`,
          `${url}`,
          `${chalk.magenta('QUERY')}: ${queryParams}`,
          `${chalk.magenta('BODY')}: ${body}`,
          ExpressLogger.formatStatusCode(res.statusCode),
          `${timeDelta}ms`
        );
      });

      next();
    };
  }

  getErrorMiddleware() {
    return async (
      err: Error,
      _req: Request,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      const date = new Date().toISOString();
      const errorMessage = `[${chalk.gray(date)}] ${chalk.red('ERROR')} ${
        err.message
      }`;
      this.error(errorMessage, `\n${err.stack}\n`, '-'.repeat(100));
      next(err);
    };
  }
}

export default ExpressLogger;
