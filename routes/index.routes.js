const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Welcome to home page");
});

module.exports = router;


//minute 10.05 youtube Lama  