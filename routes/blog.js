const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("blog", { info: "'latest news'" });
});

module.exports = router;
