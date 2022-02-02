import "./styles/main.scss";

console.log("hello it's me, index.js");
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    margin: 30,
    nav: true,
    loop: true,
    center: true,
  });
});
