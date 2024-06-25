const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }, 
  numberInStock: {
    type: Number,
    min: 0,
    max:255
  },
  dailyRentalRate:{
    type: Number,
    min: 0,
    max:255
  }

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
