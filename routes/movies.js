const { Movie, validation }  = require('../models/movies');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly-api', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', async (req, res) => {
    const movie = await Movie.find();
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
})

module.exports = router;