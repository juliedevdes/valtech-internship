const express = require("express");
const router = express.Router();

const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3000";

function getProducts() {
  return axios.get("/api/products");
}

function getCategories() {
  return axios.get("/api/categories");
}

function getProductsOnSale() {
  return axios.get("/api/products?sale=true");
}

function getBestSellers() {
  return axios.get("/api/products?bestSeller=true");
}

router.get("/", (req, res, next) => {
  Promise.all([
    getProducts(),
    getCategories(),
    getBestSellers(),
    getProductsOnSale(),
  ])
    .then(function (results) {
      const products = results[0].data.docs.slice(0, 5);
      const categories = results[1].data;
      const bestSellers = results[2].data.docs.slice(0, 5);
      const onSale = results[3].data.docs.slice(0, 5);

      res.render("homepage", {
        products,
        bestSellers,
        onSale,
        categories,
        bestDeals: onSale.filter(
          (product) =>
            product.bestSeller === true && product.salePercentage > 38
        ),
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
