const Joi = require("joi");
const express = require("express");
const router = express.Router();

const movies = [
  { id: 1, name: "Famous in Love", genre: "Romance" },
  { id: 2, name: "Expandables", genre: "Action" },
  { id: 3, name: "The conjuring", genre: "Thriller" },
  { id: 4, name: "Spider man", genre: "Science Fiction" },
  { id: 5, name: "Game of Thrones", genre: "Drama" },
  { id: 6, name: "Now what", genre: "comedy" },
  { id: 7, name: "break in dance", genre: "Musical" },
  { id: 8, name: "Stranger Things", genre: "Fantasy" },
  { id: 9, name: "Lord of Rings", genre: "Advanture" },
  { id: 10, name: "Tomb Raider", genre: "Mystery" },
];

//GET request

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((g) => g.id === parseInt(req.params.id));
  if (!movie) {
    return res
      .status(404)
      .send("The movie-Genre with the given ID was not found.");
  }
  res.send(movie);
});

//POST request
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

//PUT request
router.put("/:id", (req, res) => {
  const movie = movies.find((g) => g.id === parseInt(req.params.id));
  if (!movie) {
    return res
      .status(404)
      .send("The movie-Genre with the given ID was not found.");
  }
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  movie.name = req.body.name;
  res.send(movie);
});

//DELETE request
router.delete("/:id", (req, res) => {
  const movie = movies.find((g) => g.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).send("The genre with the Given ID was not found");
  }
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});

//INPUT VALIDATION
function validateGenre(movie) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(movie, schema);
}

module.exports = router;
