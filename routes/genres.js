const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validationGenre } = require("../models/genres");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  throw new Error("Could not get the genres.");
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", auth, async (req, res) => {
  const gender = await Genre.find({ _id: req.params.id });
  if (!gender)
    return res.status(404).send("The gender with the given ID was not found.");
  res.send(gender);
});

router.post("/", auth, async (req, res) => {
  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    genre: req.body.genre
  });

  const result = await genre.save();
  res.send(result);
});

router.put("/:id", auth, async (req, res) => {
  const genrer = await Genre.updateOne(
    { _id: req.params.id },
    {
      $set: { genre: req.body.genre }
    }
  );
  if (!genrer)
    return res.status(404).send("The genrer with the given ID was not found");

  const { error } = validationGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(genrer);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findOneAndDelete(req.params.id);
  if (!genre)
    res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
