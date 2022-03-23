const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios
    .get("http://localhost:3000/api/products")
    .then((response) => {
      const bestSellers = response.data.docs
        .filter((product) => product.bestSeller === true)
        .slice(0, 5);
      const onSale = response.data.docs
        .filter((product) => product.isOnSale === true)
        .slice(0, 6);
      res.render("homepage", {
        products: response.data.docs.slice(0, 5),
        bestSellers,
        onSale,
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
