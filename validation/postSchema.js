// validation/postSchema.js
const Joi = require('joi');

// Define the Joi schema for post data
const postSchema = Joi.object({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().required(),
  body: Joi.string().required()
});

module.exports = postSchema;
