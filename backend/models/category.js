const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

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
    description: {
      type: String,
      default: "Description of this category is on it's way",
    },
  },
  { versionKey: false }
);

const Category = model("category", catSchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string(),
  description: Joi.string(),
});

module.exports = { Category, joiSchema };
