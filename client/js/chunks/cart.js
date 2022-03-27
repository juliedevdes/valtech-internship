const clearCartBtn = document.querySelector(".clear-cart-btn");
const openModalBtn = document.querySelector("[modal-open]");
const closeModalBtn = document.querySelector("[modal-close]");
const modal = document.querySelector("[modal]");
const cartProductsList = document.querySelector(".modal_product-list");
const buyBtns = document.querySelectorAll(".products_buy-btn");

const cartListHbs = require("../../../views/partials/cartList.hbs");
const { buyBtnHandler } = require("../buyBtnHandler.js");

const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3000";

var Handlebars = require("hbsfy/runtime");
const async = require("hbs/lib/async");

Handlebars.registerHelper("priceCounter", (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);

  return Math.ceil(newPrice);
});

function cartHandler() {
  const cart = localStorage.getItem("cart");

  if (cart === null || cart === "null") {
    cartProductsList.innerHTML = cartListHbs({ cart: null });
  } else {
    const cartObejctsArray = JSON.parse(cart);
    cartProductsList.innerHTML = cartListHbs({ cart: cartObejctsArray });
  }

  modal.classList.toggle("is-hidden");
}

//event listeners
buyBtns.forEach((btn) => {
  btn.addEventListener("click", buyBtnHandler);
});

openModalBtn.addEventListener("click", cartHandler);

closeModalBtn.addEventListener("click", (e) => {
  modal.classList.toggle("is-hidden");
});

clearCartBtn.addEventListener("click", () => {
  localStorage.setItem("cart", null);

  cartProductsList.innerHTML = cartListHbs({ cart: null });
});
