const express = require("express");
const router = express.Router();

const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3000";

router.get("/", (req, res, next) => {
  axios
    .get(`/api/categories`)
    .then((response) => {
      res.render("categories", { categories: response.data });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:category", (req, res, next) => {
  const { category } = req.params;

  axios
    .get(`/api/categories?name=${category}`)
    .then((response) => {
      res.render("categories", { category: response.data });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
