import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";
import cartHandler from "./modules/cart-handler.js";

setTimeout(() => {
  const resultSection = document.querySelector(".result-section");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  const searchField = document.querySelector(".header-banner__search-field");
  const cartButton = document.querySelector(".header-banner__cart-icon");

  // Generate product html boxes
  searchHandler.getSearchResults().forEach((product) => {
    resultSection.innerHTML += htmlHandler.generateArticleBox(product);
  });

  // Select the buttons inside it, and apply onclick function
  cartHandler.initAddToCartButton(resultSection);

  // Shopping cart button sends you to cart
  cartButton.addEventListener("click", () => {
    cartHandler.goToCart();
  });

  // Search field visibility toggle button
  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  // Search on enter press
  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });
}, 10); // 10 ms
