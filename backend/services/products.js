const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { joiSchema } = require("../models/product");

router.get("/", async (req, res, next) => {
  const {
    category,
    bestSeller,
    sale,
    sort = -1,
    page = 1,
    perPage = 16,
  } = req.query;

  try {
    if (category || bestSeller || sale) {
      res.json(
        await Product.paginate(
          {
            $and: [
              { category: category || { $type: "string" } },
              { isOnSale: sale || { $in: [true, false] } },
              { bestSeller: bestSeller || { $in: [true, false] } },
            ],
          },
          { sort: { createdAt: sort }, page, limit: perPage }
        )
      );
    } else {
      res.json(
        await Product.paginate(
          {},
          { sort: { createdAt: sort }, page, limit: perPage }
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const foundContact = await Product.findById(productId);
    if (!foundContact) {
      throw new NotFound();
    }

    res.json(foundContact);
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

    const category = await Category.findOne({ name: req.body.category });
    const newProduct = await Product.create({
      ...req.body,
      categoryId: category._id,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { property, newValue } = req.query;

  try {
    if (!property || !newValue) {
      throw new BadRequest("Unset property or newValue query");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        [property]: newValue,
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new NotFound("No product with this id");
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      throw new NotFound();
    }

    res.json({
      message: `${deletedProduct.productName} - this product was succesfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
