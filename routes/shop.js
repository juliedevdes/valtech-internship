const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  ///console.log(localStorage.getItem("filter"));
  axios
    .get("http://localhost:3000/api/products")
    .then((response) => {
      res.render("shop", { products: response.data.docs });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
