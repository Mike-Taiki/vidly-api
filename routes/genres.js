const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const genres = [
  { id: 0, genre: 'Action' },
  { id: 1, genre: 'Comedy' },
  { id: 2, genre: 'Horror' },
]

router.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const gender = genres.find(genre => parseInt(req.params.id) === genre.id);
  if (!gender) return res.status(404).send('The gender with the given ID was not found.');
  res.send(gender);
});

router.post('/', (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gender = { 
      id: genres.length + 1, 
      genre: req.body.genre,
  }

  genres.push(gender);
  res.send(genres);
});

router.put('/:id', (req, res) => {
  const genrer = genres.find(gender => gender.id === parseInt(req.params.id));
  if (!genrer) return res.status(404).send('The genrer with the given ID was not found');

  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genrer.genre = req.body.genre;
  res.send(genres);
})

router.delete('/:id', (req, res) => {
  const gender = genres.find(gender => gender.id === parseInt(req.params.id));
  if (!gender) res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(gender);
  genres.splice(index, 1);

  res.send(genres);
})

function validation(genre) {
  const schema = Joi.object({
      genre: Joi.string().min(4).required()
  });

  return schema.validate(genre);
}

module.exports = router;