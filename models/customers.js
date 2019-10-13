const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = new mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: false,
        default: false,
    },
    name: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 100
    },
    phone: {
        required: true,
        type: Number
    }
}));

function validation(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().required()
    });
  
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validation;