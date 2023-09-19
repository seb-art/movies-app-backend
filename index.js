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
    return res.status(404).send("The movie with the given ID was not found.");
  }
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
