const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

//GET request

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");

  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res
      .status(404)
      .json({ message: "The movie-Genre with the given ID was not found." });
  }
  res.send(genre);
});

//POST request
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

//PUT request
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res
      .status(404)
      .json({ message: "The movie-Genre with the given ID was not found." });
  }

  res.send(genre);
});

//DELETE request
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndremove(req.params.id);

  if (!genre) {
    res
      .status(404)
      .json({ message: "The genre with the Given ID was not found" });
  }

  res.send(genre);
});

//INPUT VALIDATION
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
