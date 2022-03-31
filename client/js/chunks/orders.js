const orderList = document.querySelector(".order-list");
const form = document.querySelector(".order-form");

const orderListHbs = require("../../../views/partials/orderList.hbs");

const axios = require("axios");

const Handlebars = require("hbsfy/runtime");

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
        (product.price - product.price * (product.salePercentage / 100)) *
          product.quantity;
    } else {
      totalPrice = product.price * product.quantity + totalPrice;
    }
  });

  return Math.ceil(totalPrice);
});

const deletBtnHandler = (e) => {
  const productID = e.target.getAttribute("dataId");

  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter((product) => product._id !== productID);

  localStorage.setItem("cart", JSON.stringify(newCart));

  renderOrderList();
};

const renderOrderList = function () {
  const cart = JSON.parse(localStorage.getItem("cart"));
  orderList.innerHTML = orderListHbs({ products: cart });

  const deleteBtns = document.querySelectorAll(".order-list_delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deletBtnHandler);
  });
};

const resetForm = (e) => {
  e.target.elements.address.value = "";
  e.target.elements.phone.value = "";
  e.target.elements.email.value = "";

  localStorage.setItem("cart", null);
};

renderOrderList();

//event listeners
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
    await axios.post("/api/orders", orderBody, {
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
