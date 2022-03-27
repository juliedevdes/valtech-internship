const { Schema, model, SchemaTypes } = require("mongoose");
const pagination = require("mongoose-paginate-v2");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Set name for contact"],
    },
    price: { type: Number, required: [true, "Set price"] },
    category: {
      type: String,
      required: [true, "Set category"],
    },
    productName: {
      type: String,
    },
    categoryId: {
      type: SchemaTypes.ObjectId,
      ref: "category",
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
  },
  { versionKey: false, timestamps: true }
);

productSchema.plugin(pagination);

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
  description: Joi.string(),
  bestSeller: Joi.boolean(),
  isOnSale: Joi.boolean(),
  salePercentage: Joi.number(),
  img: Joi.string(),
});

module.exports = { Product, joiSchema };
