const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const User = require("../models/users");

// Create a new user
const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already exists" });
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .json(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        password: req.body.password,
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

// INPUT VALIDATION
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$"))
      .pattern(new RegExp("[a-z]"))
      .pattern(new RegExp("[A-Z]"))
      .pattern(new RegExp("[0-9]"))
      .pattern(new RegExp("[!@#$%^&*]"))
      .required(),
  });

  return schema.validate(user);
}

module.exports = {
  createUser,
  updateUser,
  getCurrentUser,
};
