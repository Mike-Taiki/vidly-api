const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 0, genre: 'Branco' },
    { id: 1, genre: 'Amarelo' },
    { id: 2, genre: 'Pardo' },
    { id: 3, genre: 'Preto' },
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const gender = genres.find(genre => parseInt(req.params.id) === genre.id);
    if (!gender) return res.status(404).send('The gender with the given ID was not found.');
    res.send(gender);
});

app.post('/api/genres', (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gender = { 
        id: genres.length + 1, 
        genre: req.body.genre,
    }

    genres.push(gender);
    res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
    const genrer = genres.find(gender => gender.id === parseInt(req.params.id));
    if (!genrer) return res.status(404).send('The genrer with the given ID was not found');

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genrer.genre = req.body.genre;
    res.send(genres);
})

app.delete('/api/genres/:id', (req, res) => {
    const gender = genres.find(gender => gender.id === parseInt(req.params.id));
    if (!gender) res.status(404).send('The genre with the given ID was not found.');

    const index = genres.indexOf(gender);
    genres.splice(index, 1);

    res.send(genres);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

function validation(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(4).required()
    });

    return schema.validate(genre);
}