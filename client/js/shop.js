const axios = require("axios");

const buyBTN = document.querySelectorAll(".products_buy-btn");

buyBTN.forEach((element) => {
  element.addEventListener("click", () => {
    const productID = element.attributes.dataId.nodeValue;

    axios
      .get(`http://localhost:3000/api/products/${productID}`)
      .then((response) => {
        const newCart = JSON.stringify(response.data);
        localStorage.setItem("cart", newCart);
      })
      .catch(console.log);

    console.log(JSON.parse(localStorage.getItem("cart")));
  });
});
