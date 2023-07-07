import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  username: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

export const createEventSchema = Joi.object({
  name: Joi.string().min(1).required(),
  dateOfEvent: Joi.date().iso().required(),
  description: Joi.string().min(1).required(),
  location: Joi.string().min(1).required(),
});

export const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const getEventsSchema = Joi.object({
  pageNumber: Joi.number().min(1).required(),
  pageSize: Joi.number().min(1).required(),
  sort: Joi.string().allow("asc", "desc").only().required(),
});
