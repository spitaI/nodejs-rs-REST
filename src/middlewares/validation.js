/**
 * Get details of validation errors
 * @param {{ path: string, message: string }[]} errors - Array containing Joi validation errors
 * @returns {{ code: 400, errors: { path: string, message: string }[] }} Object with details of validation errors
 */
const getErrorDetails = errors => ({
  code: 400,
  errors: errors.map(({ path, message }) => ({ path, message })),
});

/**
 * Create validation middleware for given Joi schema
 * @param {import('joi').Schema} schema - Joi schema for request body validation
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void} Validation middleware
 */
export const getValidationMiddleware = schema => async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json(getErrorDetails(error.details));
  } else next();
};
