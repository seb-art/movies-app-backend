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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    res
      .status(404)
      .json({ message: "The genre with the Given ID was not found" });
  }

  res.send(genre);
});

//INPUT VALIDATION
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
