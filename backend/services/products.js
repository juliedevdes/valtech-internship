const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
const { any, date } = require("joi");
// const productHelper = require("../models/productsHelper");
const { Product } = require("../models/product");
const { joiSchema } = require("../models/product");

// router.get("/", (req, res, next) => {
//   const { category = null } = req.query;
//   productHelper
//     .getAllProduct()
//     .then((products) => {
//       if (category) {
//         res.json(
//           products.rows.filter((product) => product.category === category)
//         );
//       } else {
//         res.json(products.rows);
//       }
//     })
//     .catch((e) => console.log);
// });

router.get("/", async (req, res, next) => {
  const { category, bestSeller, sale } = req.query;
  try {
    if (category && bestSeller && sale) {
      res.json(
        await Product.find({
          $and: [
            { category: category },
            { isOnSale: true },
            { bestSeller: true },
          ],
        })
      );
    } else {
      res.json(await Product.find().sort({ date: "desc" }));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const foundContact = await Product.findById(productId);
    if (!foundContact) {
      throw new NotFound();
    }
    res.json(foundContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    console.log(req.body);
    const newProduct = await Product.create({
      ...req.body,
      date: new Date(),
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      throw new NotFound();
    }
    res.json({
      message: `${deletedProduct.productName} - this product was succesfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// const products = require("../../products.json");

// const main = async function () {
//   for (const u of products) {
//     await Product.create({
//       ...u,
//       date: new Date(),
//     });
//     console.log(`Created product ${u.productName}`);
//   }
// };

// main();
