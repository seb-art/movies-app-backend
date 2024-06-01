const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/MovieController");


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
