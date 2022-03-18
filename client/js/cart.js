const clearCart = document.querySelector(".clear-cart-btn");
const openModalBtn = document.querySelector("[modal-open]");
const closeModalBtn = document.querySelector("[modal-close]");
const modal = document.querySelector("[modal]");
const cartProdList = document.querySelector(".modal_product-list");
const cartListHbs = require("../../views/partials/cartList.hbs");
const axios = require("axios");

const buyBtnHandler = async function (e) {
  console.log(e.target);
  const productID = e.target.getAttribute("dataId");
  const product = await axios.get(
    `http://localhost:3000/api/products/${productID}`
  );

  const cart = localStorage.getItem("cart");
  if (cart === null || cart === "null") {
    localStorage.setItem("cart", JSON.stringify([product.data]));
  } else {
    const oldCart = JSON.parse(localStorage.getItem("cart"));
    const newCart = [...oldCart, product.data];
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
};

const buyBtns = document.querySelectorAll(".products_buy-btn");
buyBtns.forEach((btn) => {
  btn.addEventListener("click", buyBtnHandler);
});

clearCart.addEventListener("click", () => {
  localStorage.setItem("cart", null);
  cartProdList.innerHTML = "<li>Your cart is empty</li>";
});

openModalBtn.addEventListener("click", cartHandler);
closeModalBtn.addEventListener("click", (e) => {
  modal.classList.toggle("is-hidden");
});

function cartHandler() {
  const cart = localStorage.getItem("cart");
  if (cart === null || cart === "null") {
    cartProdList.innerHTML = "<li>Your cart is empty</li>";
  } else {
    const cartObejctsArray = JSON.parse(cart);
    // let cartList = "";
    // cartObejctsArray.forEach((product) => {
    //   cartList = cartList + `<li>${product.productName}</li>`;
    // });
    cartProdList.innerHTML = cartListHbs({ cart: cartObejctsArray });
  }
  modal.classList.toggle("is-hidden");
}

module.exports = { buyBtnHandler };
