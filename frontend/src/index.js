import "./styles/main.scss";

import "./styles/owlcarousel/owl.carousel.min.css";
import "./styles/owlcarousel/owl.theme.default.min.css";

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    dots: false,
  });
});
