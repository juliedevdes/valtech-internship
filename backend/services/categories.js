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

router.patch("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;
  const { property, newValue } = req.query;

  try {
    if (!property || !newValue) {
      throw new BadRequest("Unset property or newValue query");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        [property]: newValue,
      },
      { new: true }
    );

    if (!updatedCategory) {
      throw new NotFound("No category with this id");
    }

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      throw new NotFound();
    }

    res.json({
      message: "This category was succesfully deleted",
      ...deletedCategory._doc,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
