import "./styles/main.scss";

import "./styles/owlcarousel/owl.carousel.min.css";
import "./styles/owlcarousel/owl.theme.default.min.css";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    margin: 30,
    nav: true,
    loop: true,
    center: true,
  });
});
