import inventory from "./modules/inventory.js";
import htmlGenerator from "./modules/html-generator.js";
import searchHandler from "./modules/search-handler.js";

let productSection = document.querySelector(".products-section");
let searchButton = document.querySelector(".header-banner__search-toggle");
let searchField = document.querySelector(".header-banner__search-field");

const showAllProducts = (element) => {
  const allProducts = inventory.getAll();
  let htmlTxt = "";

  allProducts.forEach((product) => {
    htmlTxt += htmlGenerator(product);
  });
  element.innerHTML = htmlTxt;
};

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

// Initialize
showAllProducts(productSection);
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("header-banner__search-toggle")) {
    click();
  }
});
