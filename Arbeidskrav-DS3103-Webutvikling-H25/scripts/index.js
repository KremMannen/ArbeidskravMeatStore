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

  inventoryAll.forEach((product) => {
    productSection.innerHTML += htmlHandler.generate(product);
    productSection
      .querySelectorAll(".product-box__button--purchase")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const productId = parseInt(button.dataset.id); // gets id from html button
          const product = inventoryAll.find((p) => p.id === productId);

          if (product) {
            cartHandler.pushObject(product);
            console.log(`Added to cart: ${product.name}`);
          }
        });
      });
  });

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  cartButton.addEventListener("click", () => {
    cartHandler.goToCart();
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });
}, 10); // 10 ms
