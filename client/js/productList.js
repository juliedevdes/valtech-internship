const axios = require("axios");
const productsList = document.querySelector(".products_list");
const productListHbs = require("../../views/partials/productList.hbs");
const nextPageBtn = document.querySelector(".next-page-btn");
firstPageBtn = document.querySelector(".first-page-btn");

const buyBtnHandler = async function (e) {
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

//fuction checks all storage + forms query + sets innerHTML -- should be call when click on any filter
const renderProductList = async function (page = 1) {
  if (page === 1) {
    localStorage.setItem("page", 1);
  }

  let sale = localStorage.getItem("sale");
  if (sale === "false") {
    sale = "";
  } else {
    sale = `sale=true`;
  }

  let bestSeller = localStorage.getItem("bestSeller");
  if (bestSeller === "false") {
    bestSeller = "";
  } else {
    bestSeller = `bestSeller=true`;
  }

  let cat = localStorage.getItem("category");
  if (cat === "all") {
    cat = "";
  } else {
    cat = `category=${cat}`;
  }
  const query = `page=${page}&${sale}&${bestSeller}&${cat}`;
  const filteredProducts = await axios.get(
    `http://localhost:3000/api/products?${query}`
  );
  console.log(query);
  console.log(page);

  productsList.innerHTML = productListHbs({
    products: filteredProducts.data.docs,
    page,
  });

  const buyBtns = document.querySelectorAll(".products_buy-btn");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", buyBtnHandler);
  });
};

//best-sellers filter
const bestSellFil = document.querySelector("#bestSeller");
bestSellFil.addEventListener("click", (e) => {
  const bestSeller = localStorage.getItem("bestSeller");

  if (bestSeller === "false") {
    localStorage.setItem("bestSeller", "true");
  } else {
    localStorage.setItem("bestSeller", "false");
  }

  renderProductList();
});

//sale filter
const saleFil = document.querySelector("#sale");
saleFil.addEventListener("click", (e) => {
  const sale = localStorage.getItem("sale");

  if (sale === "false") {
    localStorage.setItem("sale", "true");
  } else {
    localStorage.setItem("sale", "false");
  }

  renderProductList();
});

//category filter
const catFil = document.querySelector("#cat");
catFil.addEventListener("change", (e) => {
  const cat = catFil.value;
  localStorage.setItem("category", cat);

  renderProductList();
});

//next-page
nextPageBtn.addEventListener("click", (e) => {
  let page = JSON.parse(localStorage.getItem("page"));
  page += 1;
  localStorage.setItem("page", page);
  renderProductList(page);
});

//1-st page
firstPageBtn.addEventListener("click", (e) => {
  renderProductList();
});
