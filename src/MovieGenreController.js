const Joi = require("joi");
const Genre = require('../models/genres')
const getGenres = async (req, res) => {
  const genres = await Genre.find().sort("name");

  res.send(genres);
};

const getGenre = async (req, res) => {
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
};

const createGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
};

const updateGenre = async (req, res) => {
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
};

const deleteGenre = async (req, res) => {
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
};

//INPUT VALIDATION
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = {
    getGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
  };
