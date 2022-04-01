const express = require("express");
const router = express.Router();
const { Category } = require("../../models/category");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.render("categories", { categories });
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const { name } = req.params;

    const category = await Category.findOne({ name });

    res.render("categories", { category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
