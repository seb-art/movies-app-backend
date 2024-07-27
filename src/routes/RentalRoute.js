const express = require("express");
const router = express.Router();
const {
  getRentals,
  getRental,
  createRental,
} = require("../controllers/RentalController");
const auth = require("../middleware/auth");

router.get("/", getRentals);

router.post("/",auth, createRental);

router.get("/:id", getRental);

module.exports = router;
