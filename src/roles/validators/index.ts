import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

const createRoleValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const listRolesValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.number(),
  }),
});

const showRolesValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

const deleteRolesValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

const putRolesValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

export {
  createRoleValidator,
  listRolesValidator,
  showRolesValidator,
  deleteRolesValidator,
  putRolesValidator,
};
