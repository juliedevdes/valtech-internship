import "./js/jquery.min.js";
import "./js/owl.carousel.min.js";

import "./styles/owlcarousel/owl.carousel.min.css";

import "./styles/owlcarousel/owl.theme.default.min.css";

import "./styles/main.scss";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
  });
});
