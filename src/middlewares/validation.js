/**
 * @module ValidationMiddleware
 * @category Middlewares
 */

/**
 * Get details of validation errors
 * @param {Array.<{ path: string, message: string }>} errors - Array containing Joi validation errors
 * @returns {Array.<{ code: 400, errors: { path: string, message: string } }>} Object with details of validation errors
 */
const getErrorDetails = errors => ({
  code: 400,
  errors: errors.map(({ path, message }) => ({ path, message })),
});

/** @typedef {import('joi').Schema} Schema */

/** @typedef {import('express').Request} Request */

/** @typedef {import('express').Response} Response */

/** @typedef {import('express').NextFunction} NextFunction */

/**
 * Create validation middleware for given Joi schema
 * @param {Schema} schema - Joi schema for request body validation
 * @returns {function(Request, Response, NextFunction): void} Validation middleware
 */
const getValidationMiddleware = schema => async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json(getErrorDetails(error.details));
  } else next();
};

export { getValidationMiddleware };
