import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import ExpressLogger from '../utils/logger';
import { COMMON_ERRORS } from '../constants/errors';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private logger: ExpressLogger) {}

  catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (!(error instanceof HttpException)) {
      this.logger.logError(error);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: COMMON_ERRORS.HTTP_500 });
      return;
    }

    const exception = <HttpException>error;
    response.status(exception.getStatus()).send(exception.getResponse());
  }
}
