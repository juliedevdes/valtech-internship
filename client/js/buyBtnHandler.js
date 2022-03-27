const axios = require("axios");

const buyBtnHandler = async function (e) {
  const productID = e.target.getAttribute("dataId");
  const product = await axios.get(`/api/products/${productID}`);

  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart === null || cart === "null") {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...product.data, quantity: 1 }])
    );
  } else {
    if (cart.find((product) => product._id === productID)) {
      cart.forEach((product) => {
        if (product._id === productID) {
          product.quantity = product.quantity + 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      });
    } else {
      const newCart = [...cart, { ...product.data, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
};

module.exports = { buyBtnHandler };
