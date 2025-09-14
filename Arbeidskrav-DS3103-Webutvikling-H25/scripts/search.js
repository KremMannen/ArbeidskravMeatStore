import htmlGenerator from "./modules/html-generator.js";
import searchHandler from "./modules/search-handler.js";

setTimeout(() => {
  const resultSection = document.querySelector(".result-section");
  const searchButton = document.querySelector(".header-banner__search-toggle");
  let searchField = document.querySelector(".header-banner__search-field");

  const showSearchResults = (element) => {
    if (!element) {
      return;
    }
    const searchResults = searchHandler.getSearchResults();
    let htmlTxt = "";
    searchResults.forEach((product) => {
      htmlTxt += htmlGenerator(product);
    });
    element.innerHTML = htmlTxt;
  };

  function search() {
    const searchTerm = searchField.value.trim();
    searchField.value = "";

    if (searchTerm) {
      searchHandler.executeSearch(searchTerm);
    }
    searchField.classList.add("hidden");
  }

  // Initialize
  showSearchResults(resultSection);

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      search();
    }
  });
}, 10); // 10 ms
