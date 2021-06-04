import fs, { WriteStream } from 'fs';
import path from 'path';

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
    this.logStream?.write(msg);
  }

  error(...errorMessage: string[]): void {
    const errMsg = `${errorMessage.join(' ')}\n`;

    process.stderr.write(errMsg);
    this.errorLogStream?.write(errMsg);
  }
}

export default ExpressLogger;
