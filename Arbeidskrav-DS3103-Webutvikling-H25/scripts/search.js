import htmlGenerator from "./modules/html-generator.js";
import searchHandler from "./modules/search-handler.js";

const resultSection = document.querySelector(".result-section");
const searchButton = document.querySelector(".header-banner__search-toggle");
let searchField = document.querySelector(".header-banner__search-field");

const click = () => {
  if (searchField.classList.contains("hidden")) {
    searchField.classList.remove("hidden");
  } else {
    const searchTerm = searchField.value.trim();
    searchField.value = "";
    if (searchTerm) {
      searchHandler.executeSearch(searchTerm);
    }
    searchField.classList.add("hidden");
  }
};

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

showSearchResults(resultSection);

// Initialize
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("header-banner__search-toggle")) {
    click();
  }
});
