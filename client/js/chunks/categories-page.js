const productsList = document.querySelector(".products_list");
const nextPageBtn = document.querySelector(".next-page-btn");
const firstPageBtn = document.querySelector(".first-page-btn");
const productListHbs = require("../../../views/partials/productList.hbs");
const starHbs = require("../../../views/partials/svg/star.hbs");

const axios = require("axios");

const { buyBtnHandler } = require("../buyBtnHandler.js");

const Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper("priceCounter", (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);

  return Math.ceil(newPrice);
});

Handlebars.registerPartial("star", starHbs);

//set default
localStorage.setItem("page", "1");

//getting current category
const currentCategory = window.location.pathname.slice(12);

const renderProductList = async function (page = 1, category) {
  const categoryProducts = await axios.get(
    `/api/products?page=${page}&category=${category}`
  );

  productsList.innerHTML = productListHbs({
    products: categoryProducts.data.docs,
  });

  const buyBtns = document.querySelectorAll(".products_buy-btn");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", buyBtnHandler);
  });
};

renderProductList(1, currentCategory);

//pagination
nextPageBtn.addEventListener("click", (e) => {
  let page = JSON.parse(localStorage.getItem("page"));
  page += 1;

  localStorage.setItem("page", page);

  renderProductList(page, currentCategory);
});

firstPageBtn.addEventListener("click", (e) => {
  renderProductList(1, currentCategory);
});
