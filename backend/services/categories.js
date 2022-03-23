const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
const { Category } = require("../models/category");
const { joiSchema } = require("../models/category");

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

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const newCat = await Category.create({
      ...req.body,
    });
    res.status(201).json(newCat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
