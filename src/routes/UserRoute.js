const express = require("express");
const router = express.Router();
const {createUser,updateUser} = require('../controllers/UserController')

// router.get("/", getUsers);

// router.get("/:id", getUser);

//POST request
router.post("/", createUser);

//PUT request
router.put("/:id", updateUser);

// //DELETE request
// router.delete("/:id", deleteUser);

module.exports = router;