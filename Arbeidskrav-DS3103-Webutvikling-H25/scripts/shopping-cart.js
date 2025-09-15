import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";
import cartHandler from "./modules/cart-handler.js";

setTimeout(() => {
  const resultSection = document.querySelector(".cart-section__container");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  const searchField = document.querySelector(".header-banner__search-field");
  const cartButton = document.querySelector(".header-banner__cart-icon");

  // Initialize
  const cartContents = cartHandler.getCartContent();

  // Generate product html boxes
  cartContents.forEach((product) => {
    resultSection.innerHTML += htmlHandler.generateCartBox(product);
  });

  // Select the increment buttons on each product, and apply onclick functions
  cartHandler.initIncrementButtons(resultSection);

  cartHandler.showTotalCartSum();

  // Search field visibility toggle button
  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  // Shopping cart button sends you to cart
  cartButton.addEventListener("click", () => {
    cartHandler.goToCart();
  });

  // Search on enter press
  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });
}, 10); // 10 ms
