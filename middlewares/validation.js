const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateArticles = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30).messages({
      "string.min": "The min length of the name is 2",
      "string.max": "The max length of the name is 30",
      "string.empty": "The name feild must be filled in",
    }),
    title: Joi.string().required().messages({
      "string.empty": "The title feild must be filled in",
    }),
    text: Joi.string().required().messages({
      "string.empty": "The text feild must be filled in",
    }),
    date: Joi.date().iso().required().messages({
      "string.empty": "The date feild must be filled in",
      "string.isoDate": "The date field must be a valid ISO date",
    }),
    source: Joi.string().required().messages({
      "string.empty": "The source feild must be filled in",
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'the "link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'the "image" field must be a valid url',
    }),
    owner: Joi.string().hex().length(24).required().messages({
      "string.length": "Owner must be a valid user ID",
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password feild must be filled in",
    }),
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The min length of the name is 2",
      "string.max": "The max length of the name is 30",
      "string.empty": "The name feild must be filled in",
    }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password feild must be filled in",
    }),
  }),
});

const validateIdParam = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.length": "The id must be 24 characters",
      "string.hex": "The id must be a valid hexadecimal value",
    }),
  }),
});

module.exports = {
  validateArticles,
  validateUser,
  validateLoginBody,
  validateIdParam,
};
