const orderList = document.querySelector('.order-list');

const cart = JSON.parse(localStorage.getItem('cart'));

let cartList = '';

cart.forEach((product) => {
  cartList = cartList + `<li>${product.productName}</li>`;
});

orderList.innerHTML = cartList;

const form = document.querySelector('.order-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = e.target.elements.address.value;
  const phone = e.target.elements.phone.value;
  const paymentMethod = e.target.elements.paymentMethod.value;
  const email = e.target.elements.email.value;
  const items = JSON.parse(localStorage.getItem('cart'));

  const orderBody = JSON.stringify({
    items,
    address,
    phone,
    paymentMethod,
    email,
  });

  fetch('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: orderBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
});
