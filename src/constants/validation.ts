import Joi from 'joi';

export const USER_SCHEMA = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  id: Joi.string(),
});

export const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        order: Joi.number().required(),
        id: Joi.string(),
      })
    )
    .required(),
  id: Joi.string(),
});

export const TASK_SCHEMA = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.string().allow(null).required(),
  boardId: Joi.string().allow(null).required(),
  columnId: Joi.string().allow(null),
  id: Joi.string(),
});
