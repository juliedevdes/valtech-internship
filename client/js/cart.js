const buyBtn = document.querySelectorAll(".products_buy-btn");
const clearCart = document.querySelector(".clear-cart-btn");
const openModalBtn = document.querySelector("[modal-open]");
const closeModalBtn = document.querySelector("[modal-close]");
const modal = document.querySelector("[modal]");
const pdl = document.querySelector(".modal_product-list");

buyBtn.forEach((element) => {
  element.addEventListener("click", () => {
    const productID = element.attributes.dataId.nodeValue;
    fetch(`http://localhost:3000/api/products/${productID}`)
      .then((r) => r.json())
      .then((r) => {
        const cart = localStorage.getItem("cart");
        if (cart === null || cart === "null") {
          localStorage.setItem("cart", JSON.stringify([r]));
        } else {
          const oldCart = JSON.parse(localStorage.getItem("cart"));
          const newCart = [...oldCart, r];
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
      })
      .catch(console.log);
  });
});

clearCart.addEventListener("click", () => {
  localStorage.setItem("cart", null);
  pdl.innerHTML = "<li>Your cart is empty</li>";
});

openModalBtn.addEventListener("click", cartHandler);
closeModalBtn.addEventListener("click", (e) => {
  modal.classList.toggle("is-hidden");
});

function cartHandler() {
  const cart = localStorage.getItem("cart");
  if (cart === null || cart === "null") {
    pdl.innerHTML = "<li>Empty cart</li>";
  } else {
    const cartObejctsArray = JSON.parse(cart);
    let cartList = "";
    cartObejctsArray.forEach((product) => {
      cartList = cartList + `<li>${product.productName}</li>`;
    });
    pdl.innerHTML = cartList;
  }
  modal.classList.toggle("is-hidden");
}
