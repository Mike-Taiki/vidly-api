const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(100)
      .required(),
    email: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .max(12)
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
