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

export { createUserValidator };
