const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

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

router.get("/", getMovies);

router.get("/:id", getMovie);

//POST request
router.post("/", createMovie);

//PUT request
router.put("/:id", updateMovie);

//DELETE request
router.delete("/:id", deleteMovie);

module.exports = router;
