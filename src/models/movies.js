const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }, 
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
