const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json()); //middleware

const genres = [
  { id: 1, name: "Romance" },
  { id: 2, name: "Action" },
  { id: 3, name: "Thriller" },
  { id: 4, name: "Science Fiction" },
  { id: 5, name: "Drama" },
  { id: 6, name: "Comedy" },
  { id: 7, name: "Musical" },
  { id: 8, name: "Fantasy" },
  { id: 9, name: "Adventure" },
  { id: 10, name: "Mystery" },
];

//GET request
app.get("/", (req, res) => {
  res.send("Welcome to Movies X");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send("The movie-Genre with the given ID was not found.");
  }
  res.send(genre);
});

//POST request
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//PUT request
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send("The movie-Genre with the given ID was not found.");
  }
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genre.name = req.body.name;
  res.send(genre);
});

//DELETE request
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the Given ID was not found");
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

//INPUT VALIDATION
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}
// SERVING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
