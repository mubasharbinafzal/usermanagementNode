// validation/userSchema.js
const Joi = require('joi');

// Define the Joi schema for user data
const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    street: Joi.string().required(),
    suite: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
    geo: Joi.object({
      lat: Joi.string().required(),
      lng: Joi.string().required()
    }).required()
  }).required(),
  phone: Joi.string().required(),
  website: Joi.string().required(),
  company: Joi.object({
    name: Joi.string().required(),
    catchPhrase: Joi.string().required(),
    bs: Joi.string().required()
  }).required()
});

module.exports = userSchema;
