const express = require('express');
const router = express.Router();

const customers = [
    {id: 1, name: "sebastian"},
    {id: 2, name: "emmanuel"},
    {id: 3, name: "Gabriel"},
    {id: 4, name: "Brian"},
    {id: 5, name: "Wekesa"},
]


//GET request

router.get("/", (req, res) => {
    res.send(customers);
  });
  
  router.get("/:id", (req, res) => {
    const customer = customers.find((g) => g.id === parseInt(req.params.id));
    if (!customer) {
      return res
        .status(404)
        .send("The movie-customer with the given ID was not found.");
    }
    res.send(customer);
  });
  
  //POST request
  router.post("/", (req, res) => {
    const { error } = validatecustomer(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const customer = {
      id: customers.length + 1,
      name: req.body.name,
    };
    customers.push(customer);
    res.send(customer);
  });
  
  //PUT request
  router.put("/:id", (req, res) => {
    const customer = customers.find((g) => g.id === parseInt(req.params.id));
    if (!customer) {
      return res
        .status(404)
        .send("The movie-customer with the given ID was not found.");
    }
    const { error } = validatecustomer(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    customer.name = req.body.name;
    res.send(customer);
  });
  
  //DELETE request
  router.delete("/:id", (req, res) => {
    const customer = customers.find((g) => g.id === parseInt(req.params.id));
    if (!customer) {
      res.status(404).send("The customer with the Given ID was not found");
    }
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
  });
  
  //INPUT VALIDATION
  function validatecustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
    };
  
    return Joi.validate(customer, schema);
  }
  
  module.exports = router;

module.exports = router