const { User } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find({
    email: req.body.email,
    password: req.body.password
  });

  if (!user.length) return res.status(400).send("Invalid User.");
  res.send(user);
});

module.exports = router;
