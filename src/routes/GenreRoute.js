const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

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
router.post("/", auth, createGenre);

//PUT request
router.put("/:id", auth, updateGenre);

//DELETE request
router.delete("/:id", [auth, role], deleteGenre);

module.exports = router;
