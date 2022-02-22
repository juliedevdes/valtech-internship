const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
const { Category } = require("../models/category");
const { joiSchema } = require("../models/product");

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      res.json(await Category.findOne({ name }));
    } else {
      res.json(await Category.find());
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
