import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    roleId: Joi.string().uuid().required(),
  },
});

const listUsersValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
  }),
});

const updateProfileValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  },
});

export { createUserValidator, listUsersValidator, updateProfileValidator };
