const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

mongoose.connect("mongodb://localhost/vidly-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = await jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
