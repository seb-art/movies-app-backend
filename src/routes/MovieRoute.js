const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/MovieController");
const auth = require("../middleware/auth");

//GET request

router.get("/", getMovies);

router.get("/:id", getMovie);

//POST request
router.post("/", auth, createMovie);

//PUT request
router.put("/:id", auth, updateMovie);

//DELETE request
router.delete("/:id", auth, deleteMovie);

module.exports = router;
