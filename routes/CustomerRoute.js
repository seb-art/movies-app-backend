const express = require("express");
const {
  getCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/CustomerController");
const router = express.Router();

//GET request

router.get("/", getCustomers);

router.get("/:id", getCustomer);

//POST request
router.post("/", createCustomer);

//PUT request
router.put("/:id", updateCustomer);

//DELETE request
router.delete("/:id", deleteCustomer);

module.exports = router;
