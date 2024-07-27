const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  getCurrentUser,
} = require("../controllers/UserController");
const auth = require("../middleware/auth");

//POST request
router.post("/", createUser);

//PUT request
router.put("/:id", updateUser);
//GET current user
router.get("/me", auth, getCurrentUser);

module.exports = router;
