const cartHandler = (() => {
  let products = []; // start empty

  const getAll = () => {
    return structuredClone(products);
  };

  const pushObject = (object) => {
    products.push(structuredClone(object));
    saveCartContent();
    console.log(
      `Product "${object.name}" added to cart. Total items: ${products.length}`
    );
  };

  const saveCartContent = () => {
    sessionStorage.setItem("cartContent", JSON.stringify(products));
  };

  const getCartContent = () => {
    const storedResults = sessionStorage.getItem("cartContent");
    const cartArray = storedResults ? JSON.parse(storedResults) : [];
    return storedResults ? JSON.parse(storedResults) : [];
  };

  const restoreCart = () => {
    const storedResults = sessionStorage.getItem("cartContent");
    if (storedResults) {
      products = JSON.parse(storedResults); // replace current array, no duplicates
    }
  };

  const goToCart = () => {
    window.location.href = "../html/shopping-cart.html";
  };

  restoreCart();

  return {
    getAll,
    pushObject,
    goToCart,
    saveCartContent,
    getCartContent,
  };
})();

export default cartHandler;
