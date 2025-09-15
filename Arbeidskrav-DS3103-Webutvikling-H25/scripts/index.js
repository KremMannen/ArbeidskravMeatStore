import inventory from "./modules/inventory.js";
import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";
import cartHandler from "./modules/cart-handler.js";

// Small delay to ensure everything is ready after navigation. This prevents buttons from buggin out.
setTimeout(() => {
  const productSection = document.querySelector(".products-section");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  const searchField = document.querySelector(".header-banner__search-field");
  const cartButton = document.querySelector(".header-banner__cart-icon");

  // Initialize
  const addToCartButtons = [];
  const inventoryAll = inventory.getAll();

  // Generate product html boxes
  inventoryAll.forEach((product) => {
    productSection.innerHTML += htmlHandler.generateArticleBox(product);
  });

  // Select the buttons inside it, and apply onclick function
  cartHandler.initAddToCartButton(productSection);

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
