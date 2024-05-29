const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

//GET request

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res
      .status(404)
      .send("The movie-Genre with the given ID was not found.");
  }
  res.send(movie);
});

//POST request
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let movie = new Movie({ name: req.body.name, genre: req.body.genre });

  res.send(movie);
});

//PUT request
router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.params.name },
    { new: true }
  );
  if (!movie) {
    return res
      .status(404)
      .json({ message: "The movie-Genre with the given ID was not found." });
  }
  res.send(movie);
});

//DELETE request
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(404).send("The genre with the Given ID was not found");
  }

  res.send(movie);
});

//INPUT VALIDATION
function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(movie);
}

module.exports = router;
