const express = require("express");
const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");

const { Order } = require("../models/order");
const { joiSchema } = require("../models/order");

router.get("/", async (req, res, next) => {
  const { status, paymentMethod } = req.query;
  try {
    if (status || paymentMethod) {
      res.json(
        await Order.find({
          $and: [
            { status: status || { $type: "string" } },
            { paymentMethod: paymentMethod || { $type: "string" } },
          ],
        }).sort({ createdAt: -1 })
      );
    } else {
      res.json(await Order.find().sort({ createdAt: -1 }));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const foundOrder = await Order.findById(productId);
    if (!foundOrder) {
      throw new NotFound();
    }
    res.json(foundOrder);
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
    const newOrder = await Order.create({
      ...req.body,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.patch("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { property, newValue } = req.query;

  try {
    if (!property || !newValue) {
      throw new BadRequest("Unset property or newValue query");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        [property]: newValue,
      },
      { new: true }
    );
    if (!updatedOrder) {
      throw new NotFound("No product with this id");
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    if (!deletedOrder) {
      throw new NotFound();
    }
    res.json({
      message: "This order was succesfully deleted",
      ...deletedOrder._doc,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
