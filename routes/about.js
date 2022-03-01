const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("about", { info: "'some text'" });
});

module.exports = router;
