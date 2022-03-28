const express = require("express");
const router = express.Router();

const { Product } = require("../../models/product");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.paginate(
      {},
      { sort: { createdAt: -1 }, page: 1, limit: 16 }
    );

    res.render("shop", {
      products: products.docs,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.render("pdp", {
      product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
