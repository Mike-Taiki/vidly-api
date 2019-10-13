const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly-api', {useNewUrlParser: true, useUnifiedTopology: true});

const Genre = new mongoose.model('Genre', new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  }
}));

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const gender = await Genre.find({ _id: req.params.id});
  if (!gender) return res.status(404).send('The gender with the given ID was not found.');
  res.send(gender);
});

router.post('/', async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    genre: req.body.genre
  });

  const result = await genre.save();
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const genrer = await Genre.updateOne({ _id: req.params.id }, {
    $set: { genre: req.body.genre }
  });
  if (!genrer) return res.status(404).send('The genrer with the given ID was not found');
  
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  res.send(genrer);
})

router.delete('/:id', async (req, res) => {
  const gender = await Genre.findOneAndDelete(req.params.id);
  if (!gender) res.status(404).send('The genre with the given ID was not found.');

  res.send(gender);
})

function validation(genre) {
  const schema = Joi.object({
      genre: Joi.string().min(4).required()
  });

  return schema.validate(genre);
}

module.exports = router;