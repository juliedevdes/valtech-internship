const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("shop", { info: "categories" });
});

module.exports = router;
