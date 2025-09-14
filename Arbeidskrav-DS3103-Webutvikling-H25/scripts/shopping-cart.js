import htmlHandler from "./modules/html-handler.js";
import searchHandler from "./modules/search-handler.js";

setTimeout(() => {
  const resultSection = document.querySelector(".result-section");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  let searchField = document.querySelector(".header-banner__search-field");

  // Initialize
  // htmlHandler.display(productSection, resultSection);

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchHandler.handleSearchFromField(searchField);
    }
  });
}, 10); // 10 ms
