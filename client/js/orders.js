const orderList = document.querySelector(".order-list");

const cart = JSON.parse(localStorage.getItem("cart"));

let cartList = "";

cart.forEach((product) => {
  cartList = cartList + `<li>${product.productName}</li>`;
});

orderList.innerHTML = cartList;
