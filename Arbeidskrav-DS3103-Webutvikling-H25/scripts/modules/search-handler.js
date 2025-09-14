import inventory from "./inventory.js";

const searchHandler = (() => {
  const performSearch = (searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const allProducts = inventory.getAll();

    const results = allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearchTerm) ||
        (item.producer &&
          item.producer.toLowerCase().includes(lowerSearchTerm)) ||
        (item.info && item.info.toLowerCase().includes(lowerSearchTerm))
    );

    return results;
  };

  const saveSearchResults = (results) => {
    sessionStorage.setItem("searchResults", JSON.stringify(results));
  };

  const toggleSearchField = (searchField) => {
    searchField.classList.toggle("hidden");
    console.log(
      "Toggled search field. Now hidden:",
      searchField.classList.contains("hidden")
    );
  };

  const getSearchResults = () => {
    const storedResults = sessionStorage.getItem("searchResults");
    return storedResults ? JSON.parse(storedResults) : [];
  };

  const navigateToSearchPage = () => {
    window.location.href = "../html/search.html";
  };

  const executeSearch = (searchTerm) => {
    const results = performSearch(searchTerm);
    saveSearchResults(results);
    navigateToSearchPage();
  };

  return {
    performSearch,
    saveSearchResults,
    getSearchResults,
    navigateToSearchPage,
    executeSearch,
    toggleSearchField,
  };
})();

export default searchHandler;
