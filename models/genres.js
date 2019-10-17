const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  }
});

const Genre = new mongoose.model('Genre', genreSchema);

function validation(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(4).required()
    });

    return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validationGenre = validation;