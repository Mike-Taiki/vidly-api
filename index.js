const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});