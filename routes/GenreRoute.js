const express = require("express");

const router = express.Router();
const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/MovieGenreController");

//GET request

router.get("/", getGenres);

router.get("/:id", getGenre);

//POST request
router.post("/", createGenre);

//PUT request
router.put("/:id", updateGenre);

//DELETE request
router.delete("/:id", deleteGenre);

module.exports = router;
