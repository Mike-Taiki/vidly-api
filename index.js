const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres');

app.use('/api/genres', genres);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});