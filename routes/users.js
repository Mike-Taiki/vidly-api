const { User, validateUser } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly-api', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    user = await user.save();
    res.send(user);
})

module.exports = router;