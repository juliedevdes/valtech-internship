const express = require("express");
const router = express.Router();
const { Product } = require("../../models/product");
const { Category } = require("../../models/category");

const getRandomProduct = function (products) {
  return products[Math.floor(Math.random() * products.length)];
};

router.get("/", async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  const categories = await Category.find();
  const bestSellers = await Product.find({ bestSeller: true }).sort({
    createdAt: -1,
  });
  const onSale = await Product.find({ isOnSale: true }).sort({
    salePercentage: -1,
  });

  res.render("homepage", {
    carousel: [
      getRandomProduct(products),
      getRandomProduct(products),
      getRandomProduct(products),
    ],
    products: products.slice(0, 6),
    bestSellers: bestSellers.slice(0, 5),
    onSale: onSale.slice(1, 11),
    categories,
    bestDeal: onSale[0],
  });
});

module.exports = router;
