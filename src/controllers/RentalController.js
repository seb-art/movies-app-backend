const Joi = require("joi");
const Rental = require("../models/rentals");
const Movie = require("../models/movies");
const Customer = require("../models/customers");
const mongoose = require("mongoose");

const getRentals = async (req, res) => {
  const rentals = await Rental.find().select("-__v").sort("-dateOut");
  res.send(rentals);
};

const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id).select("-__v");

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
};

// const createRental = async (req, res) => {
//   const { error } = validateRental(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findById(req.body.customerId);
//   if (!customer) return res.status(400).send("Invalid customer.");

//   const movie = await Movie.findById(req.body.movieId);
//   if (!movie) return res.status(400).send("Invalid movie.");

//   if (movie.numberInStock === 0)
//     return res.status(400).send("Movie not in stock.");

//   let rental = new Rental({
//     customer: {
//       _id: customer._id,
//       name: customer.name,
//       phone: customer.phone,
//     },
//     movie: {
//       _id: movie._id,
//       title: movie.title,
//       dailyRentalRate: movie.dailyRentalRate,
//     },
//   });

//   // Create a session for the transaction
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // Save the rental
//     await rental.save({ session });

//     // Update the movie stock
//     movie.numberInStock--;
//     await movie.save({ session });

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     res.send(rental);
//   } catch (ex) {
//     // Abort the transaction
//     await session.abortTransaction();
//     session.endSession();

//     res.status(500).send("Something failed.");
//   }
// };

const createRental = async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    console.error('Validation error:', error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      console.error('Invalid customer ID:', req.body.customerId);
      return res.status(400).send("Invalid customer.");
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      console.error('Invalid movie ID:', req.body.movieId);
      return res.status(400).send("Invalid movie.");
    }

    if (movie.numberInStock === 0) {
      console.error('Movie not in stock:', movie._id);
      return res.status(400).send("Movie not in stock.");
    }

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    // Save the rental
    await rental.save();

    // Update the movie stock
    movie.numberInStock--;
    await movie.save();

    res.send(rental);
  } catch (ex) {
    console.error('Error during rental creation:', ex);
    res.status(500).send("Something failed.");
  }
};



function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

module.exports = {
  getRentals,
  getRental,
  createRental,
};
