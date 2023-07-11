import Joi from "joi";

const nameSchema = Joi.string().trim().min(1).required().messages({
  "string.empty": "Name is required",
  "string.base": "Name must be a valid string",
  "string.min": "Name must be a minimum of 1 character",
  "string.required": "Name is required",
  "any.required": "Name is a required",
});

const dateOfEventSchema = Joi.date().iso().required().messages({
  "string.empty": "Event Date is required",
  "string.base": "Event Date must be a valid date",
  "string.iso": "Event Date must be a valid date string",
  "string.required": "Event Date is required",
  "any.required": "Event Date is required",
});
const descriptionSchema = Joi.string().trim().min(1).required().messages({
  "string.empty": "Description is required",
  "string.base": "Description must be a valid string",
  "string.min": "Description must be a minimum of 1 character",
  "string.required": "Description is required",
  "any.required": "Description is required",
});

const locationSchema = Joi.string().trim().min(1).required().messages({
  "string.empty": "Location is required",
  "string.base": "Location must be a valid string",
  "string.min": "Location must be a minimum of 1 character",
  "string.required": "Location is required",
  "any.required": "Location is required",
});

const usernameSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Username is required",
    "string.base": "Username must be a valid string",
    "string.email": "Username must be a valid email",
    "string.required": "Username is required",
    "any.required": "Username is required",
  });

const passwordSchema = Joi.string().trim().min(8).required().messages({
  "string.empty": "Password is required",
  "string.base": "Password must be a valid string",
  "string.min": "Password must be a minimum of 8 characters",
  "string.required": "Password is required",
  "any.required": "Password is required",
});

const firstNameSchema = Joi.string().trim().min(1).max(30).required().messages({
  "string.empty": "First Name is required",
  "string.base": "First Name must be a valid string",
  "string.min": "Password must be a minimum of 1 characters",
  "string.max": "First Name has a max length of 30 characters",
  "string.required": "First Name is required",
  "any.required": "v is required",
});

const lastNameSchema = Joi.string().trim().min(1).max(30).required().messages({
  "string.empty": "Last Name is required",
  "string.base": "Last Name must be a valid string",
  "string.min": "Last Name must be a minimum of 1 characters",
  "string.max": "Last Name has a max length of 30 characters",
  "string.required": "Last Name is required",
  "any.required": "Last Name is required",
});



export const eventFormSchema = {
  name: nameSchema,
  dateOfEvent: dateOfEventSchema,
  description: descriptionSchema,
  location: locationSchema,
};

export const loginSchema = {
  username: usernameSchema,
  password: passwordSchema,
};

export const registerSchema = {
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  username: usernameSchema,
  password: passwordSchema,
};
