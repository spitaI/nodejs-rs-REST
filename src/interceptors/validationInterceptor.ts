import { ValidationErrorItem, Schema } from 'joi';
import { Request } from 'express';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const getErrorDetails = (
  errors: ValidationErrorItem[]
): {
  code: typeof HttpStatus.BAD_REQUEST;
  errors: { path: (string | number)[]; message: string }[];
} => ({
  code: HttpStatus.BAD_REQUEST,
  errors: errors.map(({ path, message }: ValidationErrorItem) => ({
    path,
    message,
  })),
});

export const getValidationInterceptor = (schema: Schema): NestInterceptor => {
  class ValidationInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<void>> {
      const ctx = context.switchToHttp();
      const req: Request = ctx.getRequest();

      const { error } = schema.validate(req.body);
      if (error) {
        throw new BadRequestException(getErrorDetails(error.details));
      }

      return next.handle();
    }
  }

  return new ValidationInterceptor();
};
