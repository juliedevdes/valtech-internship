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

const Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper("priceCounter", (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);

  return Math.ceil(newPrice);
});

function cartHandler() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cartProductsList.innerHTML = cartListHbs({ cart });

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
