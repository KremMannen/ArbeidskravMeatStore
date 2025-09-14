import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";
import cartHandler from "./modules/cart-handler.js";

setTimeout(() => {
  const resultSection = document.querySelector(".cart-section__container");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  let searchField = document.querySelector(".header-banner__search-field");
  const cartButton = document.querySelector(".header-banner__cart-icon");

  // Initialize

  cartHandler.getAll().forEach((element) => {
    resultSection.innerHTML += htmlHandler.generateCartBox(element);
  });

  htmlHandler.display(resultSection, cartHandler.getCartContent());

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });

  cartButton.addEventListener("click", () => {
    cartHandler.goToCart();
  });
}, 10); // 10 ms
