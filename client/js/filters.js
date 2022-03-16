const bestSellFil = document.querySelector("#bestSeller");
bestSellFil.addEventListener("click", (e) => {
  if (!localStorage.getItem("bestSeller")) {
    localStorage.setItem("bestSeller", "true");
  } else if (localStorage.getItem("bestSeller") === "true") {
    localStorage.setItem("bestSeller", "false");
  } else if (localStorage.getItem("bestSeller") === "false") {
    localStorage.setItem("bestSeller", "true");
  }
});

const SaleFil = document.querySelector("#sale");
SaleFil.addEventListener("click", (e) => {
  if (!localStorage.getItem("sale")) {
    localStorage.setItem("sale", "true");
  } else if (localStorage.getItem("sale") === "true") {
    localStorage.setItem("sale", "false");
  } else if (localStorage.getItem("sale") === "false") {
    localStorage.setItem("sale", "true");
  }
});

const CatFil = document.querySelector("#cat");
CatFil.addEventListener("click", (e) => {
  const cat = CatFil.value;
  localStorage.setItem("category", cat);
});
