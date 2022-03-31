const express = require("express");
const async = require("hbs/lib/async");
const router = express.Router();

const { Category } = require("../../models/category");

router.get("/", async (req, res, next) => {
  const categories = await Category.find();

  res.render("orders", { categories });
});

module.exports = router;
