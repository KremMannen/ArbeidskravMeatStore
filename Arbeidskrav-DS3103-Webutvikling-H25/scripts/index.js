import inventory from "./modules/inventory.js";
import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";
import cartHandler from "./modules/cart-handler.js";
import db from "./services/db.js";

// Small delay to ensure everything is ready after navigation. This prevents buttons from buggin out.
setTimeout(() => {
  const productSection = document.querySelector(".all-products__container");
  const limitedSection = document.querySelector(
    ".special-products__container-limited"
  );
  const selectedSection = document.querySelector(
    ".special-products__container-selected"
  );
  const searchButton = document.querySelector(".header-banner__search-toggle");
  const searchField = document.querySelector(".header-banner__search-field");
  const cartButton = document.querySelector(".header-banner__cart-icon");

  // Generate product html boxes
  // All products
  inventory.getAll().forEach((product) => {
    productSection.innerHTML += htmlHandler.generateArticleBox(product, "md-3");
  });
  // Limited products
  inventory
    .getAll()
    .filter((product) => product.tag === "limited")
    .forEach((product) => {
      limitedSection.innerHTML += htmlHandler.generateArticleBox(
        product,
        "md-6"
      );
    });

  // Selected products
  inventory
    .getAll()
    .filter((product) => product.tag === "selected")
    .forEach((product) => {
      selectedSection.innerHTML += htmlHandler.generateArticleBox(
        product,
        "md-6"
      );
    });

  // Select the buttons, and apply onclick function
  cartHandler.initAddToCartButton(productSection);
  cartHandler.initAddToCartButton(limitedSection);
  cartHandler.initAddToCartButton(selectedSection);

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
