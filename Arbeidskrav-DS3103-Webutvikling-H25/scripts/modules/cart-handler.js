import htmlHandler from "../modules/html-handler.js";

const cartHandler = (() => {
  let products = [];

  // get array of products in shoppnig cart, useful to combine with
  // htmlHandler.generate(array)
  const getAll = () => {
    return structuredClone(products);
  };

  const pushObject = (object) => {
    products.push(structuredClone(object));
    sessionStorage.setItem("cartContent", JSON.stringify(products));
    console.log(
      `Product "${object.name}" added to cart. Total items: ${products.length}`
    );
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

  const displayCart = (container) => {
    getAll().forEach((product) => {
      // Check if this product already exists in the DOM
      const existingBox = container.querySelector(
        `.cart-box[data-id="${product.id}"]`
      );

      if (existingBox) {
        // Increment counter
        const counter = existingBox.querySelector(".cart-box__product-counter");
        counter.textContent = parseInt(counter.textContent) + 1;
      } else {
        // Generate new HTML
        container.innerHTML += htmlHandler.generateCartBox(product);
      }
    });
  };

  const goToCart = () => {
    window.location.href = "../html/shopping-cart.html";
  };

  restoreCart();

  return {
    getAll,
    pushObject,
    goToCart,
    getCartContent,
    displayCart,
  };
})();

export default cartHandler;
