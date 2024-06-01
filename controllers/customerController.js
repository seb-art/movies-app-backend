const Joi = require("joi");
const Customer = require('../models/customerModel')

const getCustomers = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
};

const getCustomer = async (req, res) => {
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
};

const createCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // const { name, phone, isGold } = req.body;
  let customer = new Customer(req.body);
  customer = await customer.save();
  res.send(customer);
};

const updateCustomer = (req, res) => {
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
};

const deleteCustomer = (req, res) => {
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
};

//INPUT VALIDATION

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(10).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
