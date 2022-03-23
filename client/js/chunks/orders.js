const orderList = document.querySelector(".order-list");
const axios = require("axios");
const orderListHbs = require("../../../views/partials/orderList.hbs");
const cart = JSON.parse(localStorage.getItem("cart"));

var Handlebars = require("hbsfy/runtime");
const async = require("hbs/lib/async");
Handlebars.registerHelper("priceCounter", (price, salePercentage) => {
  const newPrice = price - price * (salePercentage / 100);
  return Math.ceil(newPrice);
});

Handlebars.registerHelper("totalPriceCounter", (products) => {
  let totalPrice = 0;
  products.forEach((product) => {
    if (product.isOnSale) {
      totalPrice =
        totalPrice +
        product.price -
        product.price * (product.salePercentage / 100);
    } else {
      totalPrice = product.price + totalPrice;
    }
  });
  return Math.ceil(totalPrice);
});

orderList.innerHTML = orderListHbs({ products: cart });

const resetForm = (e) => {
  e.target.elements.address.value = "";
  e.target.elements.phone.value = "";
  e.target.elements.email.value = "";
  localStorage.setItem("cart", null);
};

const form = document.querySelector(".order-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const address = e.target.elements.address.value;
  const phone = e.target.elements.phone.value;
  const paymentMethod = e.target.elements.paymentMethod.value;
  const email = e.target.elements.email.value;
  const items = JSON.parse(localStorage.getItem("cart"));

  const orderBody = JSON.stringify({
    items,
    address,
    phone,
    paymentMethod,
    email,
  });

  try {
    await axios.post("http://localhost:3000/api/orders", orderBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    resetForm(e);
    orderList.innerHTML = orderListHbs({ products: null });
    alert(
      "Your order successfully added! Wait for consultant reach out you to confirm your payment"
    );
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
