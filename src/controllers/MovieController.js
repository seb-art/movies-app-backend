const Joi = require("joi");
const Movie = require("../models/movies")
const Genre = require('../models/genres')
const mongoose = require ("mongoose")

const getMovies = async (req, res) => {
  const movies = await Movie.find().populate('genre');
  res.send(movies);
};

const getMovie = async (req, res) => {
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
};

const createMovie = async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) res.status(404).json({message: "Could not find the genre with the specified ID"})
  

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    movie = await movie.save();
    res.send(movie);
  } catch (ex) {
    console.error('Error saving movie:', ex);
    res.status(500).send('Something failed.');
  }
};


const updateMovie = async (req, res) => {
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
};

const deleteMovie = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    res.status(404).send("The genre with the Given ID was not found");
  }

  res.send(movie);
};

//INPUT VALIDATION
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate:Joi.number().required(), 
  });

  return schema.validate(movie);
}


module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
