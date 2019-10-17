const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genres');

const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true, 
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: false,
        min: 0,
        max: 255,
    }
}));

function validation(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validation = validation;