const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = new mongoose.model("Genre", genreSchema);

function validation(genre) {
  const schema = Joi.object({
    genre: Joi.string()
      .min(5)
      .max(50)
      .required()
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validationGenre = validation;
