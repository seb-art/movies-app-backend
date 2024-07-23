const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/users");

// Aunthenticate a user
const authenticateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "invalid email or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "invalid email or password" });
  const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET);

  res.json(token);
};

// INPUT VALIDATION
function validateUser(req) {
  const schema = Joi.object({
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

  return schema.validate(req);
}

module.exports = {
  authenticateUser,
};
