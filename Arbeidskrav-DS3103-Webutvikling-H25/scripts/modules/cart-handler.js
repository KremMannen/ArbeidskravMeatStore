import htmlHandler from "../modules/html-handler.js";
import inventory from "./inventory.js";


const cartHandler = (() => {
  let cart = [];

  // get array of products in shoppnig cart, useful to combine with
  // htmlHandler.generate(array)
  const getAll = () => {
    return structuredClone(cart);
  };

  const initAddToCartButton = (htmlElement) => {
    htmlElement
      .querySelectorAll(".product-box__button--purchase")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const productId = parseInt(button.dataset.id); // button has data-id
          const product = inventory.getAll().find((p) => p.id === productId);

          if (product) {
            cartHandler.pushObject(product);
          } else {
            console.warn(
              `⚠️ Product with id ${productId} not found in inventory`
            );
          }
        });
      });
  };


  const showTotalCartSum = () => {
  const totalContainer = document.querySelector(".cart-section__pricesummary");
  if (!totalContainer) return;

  const items = getCartContent();

  const total = items.reduce((sum, p) => {
    const price = parseInt(p.priceNOK);  
    const qty   = parseInt(p.quantity);  
    return sum + price * qty;
  }, 0);

  totalContainer.innerHTML = htmlHandler.generateTotalPriceBox(total);
};


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
      copy.quantity = 1; // start with 1
      cart.push(copy);
      console.log(
        `🛒 Added new product "${object.name}" to cart. Total items: ${cart.length}`
      );
    }

    localStorage.setItem("cartContent", JSON.stringify(cart));
    updateCartBadge();
  };

  const getCartContent = () => {
    const storedResults = localStorage.getItem("cartContent");
    const cartArray = storedResults ? JSON.parse(storedResults) : [];
    return storedResults ? JSON.parse(storedResults) : [];
  };

  const restoreCart = () => {
    const storedResults = localStorage.getItem("cartContent");
    if (storedResults) {
      cart = JSON.parse(storedResults);
    }
    updateCartBadge();
  };

  const displayCart = (container) => {
    const allProducts = getCartContent();

    console.log("🛒 DisplayCart called");
    console.log("Contents of getAll():", allProducts);

    allProducts.forEach((product, index) => {
      console.log(`Rendering product #${index + 1}:`, product);

      // Generate new HTML cart box
      container.innerHTML += htmlHandler.generateCartBox(product);
    });
  };

  const goToCart = () => {
    window.location.href = "../html/shopping-cart.html";
  };

// Functions for counting items in shopping cart and showing them over the cart-icon on the main page
const updateCartBadge = () => {
const badge = document.querySelector(".cartCount");
  if (!badge) return; 
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
  
  if (totalItems > 0) {
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
};


const initCartBadge = () => {
  const badge = document.querySelector(".cartCount");
  if (badge) {
    badge.classList.add('hidden');
    updateCartBadge(); 
  }
};

  restoreCart();

  return {
    getAll,
    pushObject,
    goToCart,
    getCartContent,
    displayCart,
    initAddToCartButton,
    showTotalCartSum,
    initCartBadge,
  };
})();

export default cartHandler;
