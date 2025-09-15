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

  // Finds all increment buttons in a DOM-element, and adds listeners to the buttons which adds or subtracts product amount
  const initIncrementButtons = (htmlElement) => {
    let subtractButtons = htmlElement.querySelectorAll(
      ".cart-box__button-subtract"
    );
    let addButtons = htmlElement.querySelectorAll(".cart-box__button-add");

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

  const getStoredCartContent = () => {
    const storedResults = localStorage.getItem("cartContent");
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
      console.warn(`Product with id ${productId} not found`);
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

  // increment buttons in shopping cart
  function addItem(button) {
    const productId = parseInt(button.dataset.id);
    const product = cart.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    product.quantity += 1;
    updateStorageFromArray();
    updateCounters();
  }
  function subtractItem(button) {
    const productId = parseInt(button.dataset.id);
    const product = cart.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    if (product.quantity <= 1) {
      cart = cart.filter((p) => p.id !== product.id);
      console.log("[Cart] Removed product:", product.id);
      updateStorageFromArray();
      location.reload(); // 🔄 reloads the page
      return; // stop here, no need to continue
    } else {
      product.quantity -= 1;
    }

    updateStorageFromArray();
    updateCounters();
  }

  // Updaters
  const updateArrayFromStorage = () => {
    const storedResults = localStorage.getItem("cartContent");
    if (storedResults) {
      cart = JSON.parse(storedResults);
    }
    updateCartBadge();
  };

  const updateStorageFromArray = () => {
    localStorage.setItem("cartContent", JSON.stringify(cart));
    console.log("[updateStorageFromArray] Cart saved to storage:", cart);
    updateCartBadge();
  };

  const updateCounters = () => {
    cart.forEach((item) => {
      const qtyElement = document.querySelector(
        `.cart-box__product-counter[data-id="${item.id}"]`
      );

      if (qtyElement) {
        qtyElement.textContent = item.quantity;
      }
    });

    updateCartSum();
  };

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

  const updateCartSum = () => {
    const totalContainer = document.querySelector(
      ".cart-section__pricesummary"
    );
    if (!totalContainer) return;

    const total = cart.reduce((sum, p) => {
      const price = parseInt(p.priceNOK);
      const qty = parseInt(p.quantity);
      return sum + price * qty;
    }, 0);

    totalContainer.innerHTML = htmlHandler.generateTotalPriceBox(total);
  };

  // Runs on load to update array from localStorage
  updateArrayFromStorage();

  return {
    getAll,
    pushObject,
    goToCart,
    getStoredCartContent,
    initAddToCartButton,
    showTotalCartSum: updateCartSum,
    updateCartBadge,
    initIncrementButtons,
  };
})();

export default cartHandler;
