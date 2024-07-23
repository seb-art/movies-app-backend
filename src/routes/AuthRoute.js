const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../controllers/AuthController')
router.post("/", authenticateUser);

module.exports = router