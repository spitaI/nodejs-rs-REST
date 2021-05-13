import Joi from 'joi';

export const USER_SCHEMA = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  id: Joi.string(),
});
