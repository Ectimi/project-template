const Joi = require("joi");

const login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};

const alterPassword = {
  body: Joi.object({
    username: Joi.string().required(),
    originPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  }),
};

module.exports = {
  login,
  register,
  alterPassword
};
