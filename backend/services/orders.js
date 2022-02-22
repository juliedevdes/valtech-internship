const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json("orders");
});

module.exports = router;
