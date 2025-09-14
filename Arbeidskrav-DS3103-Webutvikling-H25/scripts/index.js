import inventory from "./modules/inventory.js";
import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";

// Small delay to ensure everything is ready after navigation. This prevents buttons from buggin out.
setTimeout(() => {
  let productSection = document.querySelector(".products-section");
  let searchButton = document.querySelector(".header-banner__search-toggle");
  let searchField = document.querySelector(".header-banner__search-field");

  // Initialize
  htmlHandler.display(productSection, inventory.getAll());

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });
}, 10); // 10 ms
