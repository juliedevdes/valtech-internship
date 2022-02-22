const { Schema, model, SchemaTypes } = require("mongoose");

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for category"],
    },
    img: {
      type: String,
      default: "https://picsum.photos/500",
    },
  },
  { versionKey: false }
);
const Category = model("category", catSchema);

const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string(),
});

module.exports = { Category, joiSchema };
