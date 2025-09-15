import htmlHandler from "../modules/html-handler.js";
import inventory from "./inventory.js";

const cartHandler = (() => {
  let cart = [];

  // get array of products in shopping cart array
  const getAll = () => {
    return structuredClone(cart);
  };

  // Finds all purchase buttons in a DOM-element, and adds listeners to the buttons which adds its product to cart
  const initAddToCartButton = (htmlElement) => {
    htmlElement
      .querySelectorAll(".product-box__button--purchase")
      .forEach((button) => {
        button.addEventListener("click", () => {
          addToCart(button);
        });
      });
  };

  // Finds all increment buttons in a DOM-element, and adds listeners to the buttons which adds or subtrats product amount
  const initIncrementButtons = (htmlElement) => {
    let subtractButtons = htmlElement.querySelectorAll(
      ".cart-box__button--subtract"
    );

    let addButtons = htmlElement.querySelectorAll(".cart-box__button--add");

    subtractButtons.forEach((button) => {
      button.addEventListener("click", () => {
        subtractItem(button);
      });
    });

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addItem(button);
      });
    });
  };

  const showTotalCartSum = () => {
    const totalContainer = document.querySelector(
      ".cart-section__pricesummary"
    );
    if (!totalContainer) return;

    const items = getCartContent();

    const total = items.reduce((sum, p) => {
      const price = parseInt(p.priceNOK);
      const qty = parseInt(p.quantity);
      return sum + price * qty;
    }, 0);

    totalContainer.innerHTML = htmlHandler.generateTotalPriceBox(total);
  };

  const getCartContent = () => {
    const storedResults = localStorage.getItem("cartContent");
    const cartArray = storedResults ? JSON.parse(storedResults) : [];
    return storedResults ? JSON.parse(storedResults) : [];
  };

  const goToCart = () => {
    window.location.href = "../html/shopping-cart.html";
  };

  // Helper functions

  function addToCart(button) {
    const productId = parseInt(button.dataset.id); // button has data-id
    const product = inventory.getAll().find((p) => p.id === productId);

    if (product) {
      cartHandler.pushObject(product);
    } else {
      console.warn(`⚠️ Product with id ${productId} not found in inventory`);
    }
  }

  const pushObject = (object) => {
    // Check if product already exists in cart
    const existing = cart.find((p) => p.id === object.id);

    if (existing) {
      existing.quantity += 1;
      console.log(
        `🔄 Increased quantity of "${object.name}" to ${existing.quantity}`
      );
    } else {
      const copy = structuredClone(object);
      copy.quantity = 1;
      cart.push(copy);
      console.log(
        `🛒 Added new product "${object.name}" to cart. Total items: ${cart.length}`
      );
    }

    localStorage.setItem("cartContent", JSON.stringify(cart));
    updateCartBadge();
  };

  const updateArrayFromStorage = () => {
    const storedResults = localStorage.getItem("cartContent");
    if (storedResults) {
      cart = JSON.parse(storedResults);
    }
    updateCartBadge();
  };

  // Counts item in cart and shows it in a badge over the cart icon
  const updateCartBadge = () => {
    const badge = document.querySelector(".cartCount");
    if (!badge) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;

    if (totalItems > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  };

  // Runs on load to update array from localStorage
  updateArrayFromStorage();

  return {
    getAll,
    pushObject,
    goToCart,
    getCartContent,
    initAddToCartButton,
    showTotalCartSum,
    updateCartBadge,
    initIncrementButtons,
  };
})();

export default cartHandler;
