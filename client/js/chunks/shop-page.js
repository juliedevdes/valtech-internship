const productsList = document.querySelector(".products_list");
const nextPageBtn = document.querySelector(".next-page-btn");
const firstPageBtn = document.querySelector(".first-page-btn");
const categoryFilter = document.querySelector("#cat");
const bestSellFilter = document.querySelector("#bestSeller");
const saleFilter = document.querySelector("#sale");

const productListHbs = require("../../../views/partials/productList.hbs");

const { buyBtnHandler } = require("../buyBtnHandler.js");

const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3000";

var Handlebars = require("hbsfy/runtime");
const async = require("hbs/lib/async");

Handlebars.registerHelper("priceCounter", (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);

  return Math.ceil(newPrice);
});

//set default storage code
localStorage.setItem("sale", false);
localStorage.setItem("bestSeller", false);
localStorage.setItem("category", "all");
localStorage.setItem("page", "1");

function formParam(property) {
  let value = localStorage.getItem(`${property}`);
  if (value === "false") {
    value = "";
  } else {
    value = `${property}=true`;
  }

  return value;
}

const formQuery = function (page) {
  const sale = formParam("sale");
  const bestSeller = formParam("bestSeller");

  let category = localStorage.getItem("category");
  if (category === "all") {
    category = "";
  } else {
    category = `category=${category}`;
  }

  const query = `page=${page}&${sale}&${bestSeller}&${category}`;

  return query;
};

const renderProductList = async function (page = 1) {
  if (page === 1) {
    localStorage.setItem("page", 1);
  }

  const filteredProducts = await axios.get(`/api/products?${formQuery(page)}`);

  productsList.innerHTML = productListHbs({
    products: filteredProducts.data.docs,
  });

  const buyBtns = document.querySelectorAll(".products_buy-btn");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", buyBtnHandler);
  });
};

//event listeners
bestSellFilter.addEventListener("click", (e) => {
  const bestSeller = JSON.parse(localStorage.getItem("bestSeller"));
  localStorage.setItem("bestSeller", JSON.stringify(!bestSeller));

  renderProductList();
});

saleFilter.addEventListener("click", (e) => {
  const sale = JSON.parse(localStorage.getItem("sale"));
  localStorage.setItem("sale", JSON.stringify(!sale));

  renderProductList();
});

categoryFilter.addEventListener("change", (e) => {
  const cat = categoryFilter.value;
  localStorage.setItem("category", cat);

  renderProductList();
});

//pagination
nextPageBtn.addEventListener("click", (e) => {
  let page = JSON.parse(localStorage.getItem("page"));
  page += 1;
  localStorage.setItem("page", page);

  renderProductList(page);
});

firstPageBtn.addEventListener("click", (e) => {
  renderProductList();
});
