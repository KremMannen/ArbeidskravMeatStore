import inventory from "./modules/inventory.js";
import htmlGenerator from "./modules/html-generator.js";
import searchHandler from "./modules/search-handler.js";

// Small delay to ensure everything is ready after navigation. This prevents buttons from buggin out.
setTimeout(() => {
  let productSection = document.querySelector(".products-section");
  let searchButton = document.querySelector(".header-banner__search-toggle");
  let searchField = document.querySelector(".header-banner__search-field");

  // Functions
  const showAllProducts = (element) => {
    const allProducts = inventory.getAll();
    let htmlTxt = "";

    allProducts.forEach((product) => {
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
  showAllProducts(productSection);

  searchButton.addEventListener("click", () => {
    searchHandler.toggleSearchField(searchField);

    // Sets cursor on the typing field so user can type immediately
    if (!searchField.classList.contains("hidden")) {
      setTimeout(() => searchField.focus(), 100);
    }
  });

  searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      search();
    }
  });
}, 10); // 10 ms
