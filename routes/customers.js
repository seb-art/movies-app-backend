const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
//GET request

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .json({ message: "The movie-customer with the given ID was not found." });
  }
  res.send(customer);
});

//POST request
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = new Customer({ name: req.body.name });
  customer = await customer.save();
  res.send(customer);
});

//PUT request
router.put("/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const customer = Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!customer) {
    return res
      .status(404)
      .send("The movie-customer with the given ID was not found.");
  }

  res.send(customer);
});

//DELETE request
router.delete("/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format");
  }
  const customer = Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res
      .status(404)
      .json({ message: "The customer with the Given ID was not found" });
  }

  res.send(customer);
});

//INPUT VALIDATION

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(customer);
}

module.exports = router;
