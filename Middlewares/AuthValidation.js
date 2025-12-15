
/*
Joi is a powerful data validation library for JavaScript — mostly used with Express.js (or any Node.js app) to validate the structure and content of incoming data (like form input or API requests).
It ensures that the data sent from the frontend or client (like signup/login forms) is valid, safe, and formatted correctly before reaching your main logic or database.

 */

const Joi = require("joi");

const signupValidation = (req, res, next) => {x
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(40),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(40),
  });

  // Validation check whether data parse on body or not
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message, // clearer message
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(40),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  loginValidation,
  signupValidation,
};
