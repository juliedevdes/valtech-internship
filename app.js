const path = require("path");
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

const { urlencoded } = require("express");
const express = require("express");
const app = express();

/* basic middlewars */
app.use(express.static("dist"));

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

/* client routes/pages */
app.get("/", (req, res, next) => {
  console.log("Server is running");
  res.render("homepage");
});

const shopRouter = require("./routes/shop");
app.use("/shop", shopRouter);

/* backend services */
const productsRouter = require("./backend/services/products");
app.use("/api/products", productsRouter);

const categoriesRouter = require("./backend/services/categories");
app.use("/api/categories", categoriesRouter);

const ordersRouter = require("./backend/services/orders");
app.use("/api/orders", ordersRouter);

/* error handling */
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

/* database connection & and server port setting*/
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;
const mongoose = require("mongoose");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(() => {
    console.log("Database connection error");
    process.exit(1);
  });

//module.exports = { app };
