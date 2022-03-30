const express = require("express");
const router = express.Router();

const { Product } = require("../../models/product");
const { Category } = require("../../models/category");

router.get("/", async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  const categories = await Category.find();
  const bestSellers = await Product.find({ bestSeller: true }).sort({
    createdAt: -1,
  });
  const onSale = await Product.find({ isOnSale: true }).sort({
    salePercentage: -1,
  });
  const bestDeal = await Product.findOne({
    isOnSale: true,
    salePercentage: 40,
  });

  res.render("homepage", {
    products: products.slice(0, 5),
    bestSellers: bestSellers.slice(0, 5),
    onSale: onSale.slice(1, 11),
    categories,
    bestDeal,
  });
});

module.exports = router;
