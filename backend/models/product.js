// const PoolClass = require("pg").Pool;
// const app = require("../../app");
// const pool = new PoolClass({
//   user: "postgres",
//   host: "localhost",
//   port: 5432,
//   password: "root",
//   database: "shop API",
// });

// const getAllProduct = function () {
//   return pool.query("SELECT * FROM public.products");
// };

// const addNewProduct = function (product) {
//   return pool.query("");
// };

// module.exports = { getAllProduct };
const { Schema, model, SchemaTypes } = require("mongoose");

const productSchema = Schema({
  productName: {
    type: String,
    required: [true, "Set name for contact"],
  },
  price: { type: Number, required: [true, "Set price"] },
  category: {
    type: [
      "burger",
      "salad",
      "fries",
      "spaghetti",
      "combo",
      "pizza",
      "sandwich",
    ],
    required: [true, "Set category"],
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  salePercentage: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
    default: "https://picsum.photos/500",
  },
  date: {
    type: Date,
  },
});

const Product = model("product", productSchema);

const Joi = require("joi");

const joiSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.any()
    .allow(
      "burger",
      "salad",
      "fries",
      "spaghetti",
      "combo",
      "pizza",
      "sandwich"
    )
    .required(),
  bestSeller: Joi.boolean(),
  isOnSale: Joi.boolean(),
  salePercentage: Joi.number(),
  img: Joi.string(),
  date: Joi.date(),
});

module.exports = { Product, joiSchema };
