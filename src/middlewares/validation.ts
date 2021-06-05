import { ValidationErrorItem, Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

const getErrorDetails = (
  errors: ValidationErrorItem[]
): { code: 400; errors: { path: (string | number)[]; message: string }[] } => ({
  code: 400,
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
    res.status(400).json(getErrorDetails(error.details));
  } else next();
};
