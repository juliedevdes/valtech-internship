const clearCart = document.querySelector('.clear-cart-btn');
const openModalBtn = document.querySelector('[modal-open]');
const closeModalBtn = document.querySelector('[modal-close]');
const modal = document.querySelector('[modal]');
const cartProdList = document.querySelector('.modal_product-list');
const cartListHbs = require('../../../views/partials/cartList.hbs');
const axios = require('axios');

var Handlebars = require('hbsfy/runtime');
const async = require('hbs/lib/async');
Handlebars.registerHelper('priceCounter', (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);
  return Math.ceil(newPrice);
});

const buyBtnHandler = async function (e) {
  const productID = e.target.getAttribute('dataId');
  const product = await axios.get(
    `http://localhost:3000/api/products/${productID}`
  );
  const cart = localStorage.getItem('cart');
  if (cart === null || cart === 'null') {
    localStorage.setItem('cart', JSON.stringify([product.data]));
  } else {
    const oldCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = [...oldCart, product.data];
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
};

const buyBtns = document.querySelectorAll('.products_buy-btn');
buyBtns.forEach((btn) => {
  btn.addEventListener('click', buyBtnHandler);
});

clearCart.addEventListener('click', () => {
  localStorage.setItem('cart', null);
  cartProdList.innerHTML = '<li>Your cart is empty</li>';
});

openModalBtn.addEventListener('click', cartHandler);
closeModalBtn.addEventListener('click', (e) => {
  modal.classList.toggle('is-hidden');
});

function cartHandler() {
  const cart = localStorage.getItem('cart');
  if (cart === null || cart === 'null') {
    cartProdList.innerHTML = '<li>Your cart is empty</li>';
  } else {
    const cartObejctsArray = JSON.parse(cart);
    cartProdList.innerHTML = cartListHbs({ cart: cartObejctsArray });
  }
  modal.classList.toggle('is-hidden');
}

// const delCartProdBtn = document.querySelector('.cart_product-btn');
// console.log(delCartProdBtn);
// delCartProdBtn.addEventListener('click', (e) => {
//   const productID = e.target.getAttribute('dataId');
//   console.log(productID);
// });
//<button class="cart_product-btn" dataId={{_id}}>X</button></div>
