const express = require("express");
const router = express.Router();
const { Product } = require("../../models/product");
const { Category } = require("../../models/category");

router.get("/", async (req, res, next) => {
  const categories = await Category.find();

  try {
    const products = await Product.paginate(
      {},
      { sort: { createdAt: -1 }, page: 1, limit: 16 }
    );

    res.render("shop", {
      products: products.docs,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const categories = await Category.find();

  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.render("pdp", {
      product,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
