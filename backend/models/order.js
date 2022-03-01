const { Schema, model, SchemaTypes } = require("mongoose");
const emailRegexp = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const orderSchema = new Schema(
  {
    items: {
      type: Array,
      required: [true, "You must add a products to create an order"],
    },
    status: {
      type: String,
      enum: ["payment-pending", "proccesing", "delivering", "delivered"],
      default: "payment-pending",
    },
    address: { type: String, required: [true, "You must put an address"] },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "You must put an email"],
    },
    phone: { type: String, required: [true, "You must put an email"] },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: [true, "You must choose type of payment"],
    },
  },
  { versionKey: false, timestamps: true }
);
const Order = model("order", orderSchema);

const Joi = require("joi");

const joiSchema = Joi.object({
  items: Joi.array().required(),
  status: Joi.string(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  paymentMethod: Joi.string().required(),
});

module.exports = { Order, joiSchema };
