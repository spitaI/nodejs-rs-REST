import { ValidationErrorItem, Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

const getErrorDetails = (
  errors: ValidationErrorItem[]
): {
  code: typeof BAD_REQUEST;
  errors: { path: (string | number)[]; message: string }[];
} => ({
  code: BAD_REQUEST,
  errors: errors.map(({ path, message }: ValidationErrorItem) => ({
    path,
    message,
  })),
});

export const getValidationMiddleware = (schema: Schema) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(BAD_REQUEST).json(getErrorDetails(error.details));
  } else next();
};
