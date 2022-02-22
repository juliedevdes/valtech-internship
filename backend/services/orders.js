const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("orders", { info: "orders" });
});

module.exports = router;
