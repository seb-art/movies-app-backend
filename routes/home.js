const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Movies X");
});

module.exports = router;
