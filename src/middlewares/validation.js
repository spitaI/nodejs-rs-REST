const getErrorDetails = errors => ({
  code: 400,
  errors: errors.map(({ path, message }) => ({ path, message })),
});

export const getValidationMiddleware = schema => async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json(getErrorDetails(error.details));
  } else next();
};
