const { Customer, validate } = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly-api', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', async (req, res) => {
    const customers = await Customer.find(); 
    res.send(customers)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer(
        {
            isGold: req.body.isgold,
            name: req.body.name,
            phone: req.body.phone
        }
    );

    const result = await customer.save() 

    res.send(result);
})

module.exports = router;