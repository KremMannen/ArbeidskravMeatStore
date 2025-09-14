// html-generator.js
const htmlHandler = (() => {
  const generateArticleBox = (product) => {
    const pricePerKg = (product.priceNOK * 1000) / product.weightInGrams;

    return `
      <article class="product-box xs-12 sm-4 md-3" data-id="${product.id}">
        <img class="product-box__image img-responsive" src="../images/${
          product.imgName
        }" alt="picture of ${product.imgName}">
        
        <h2 class="product-box__title">${product.name}</h2>
        <h3 class="product-box__weight">${product.weightInGrams}g ${
      product.producer || ""
    }</h3>
        
        <p class="product-box__info">${product.info || ""}</p>
        
        <div class="product-box__bottom">
          <div class="product-box__price-info">
            <h1 class="product-box__price">${product.priceNOK}kr</h1>
            <p class="product-box__kg-price">${pricePerKg.toFixed(2)} kr/kg</p>
          </div>
          <button class="product-box__button product-box__button--purchase" data-id="${
            product.id
          }">
            <i class="fa-solid fa-cart-shopping fa-xl"></i>
          </button>
        </div>
      </article>
    `;
  };

  const generateCartBox = (product) => {
    const pricePerKg = (product.priceNOK * 1000) / product.weightInGrams;

    return `
      <article class="cart-box grid-12-column xs-12 sm-4 md-3" data-id="${product.id}">
        <img class="cart-box__image img-responsive" src="../images/${product.imgName}" alt="picture of ${product.imgName}">
        <div class="cart-box__info-container grid-12-column">
            <div class="cart-box__toptext grid-12-column">
              <h2 class="cart-box__title">${product.name}</h2>
              <h2 class="cart-box__weight">${product.weightInGrams}g</h2>
            </div>
            <h3 class="cart-box__producer">${product.producer}</h3>
            <div class="cart-box__button-container grid-12-column">
              <button class="cart-box__button cart-box__button-subtract">-</button>
              <p class="cart-box__product-number">0</p>
              <button class="cart-box__button cart-box__button-add">+</button>
            </div>
            <h3 class="cart-box__price">${product.priceNOK}kr</h3>
        </div>
      </article>
    `;
  };

  const displayArray = (element, items) => {
    if (!element || !Array.isArray(items)) {
      console.warn("displayHtml: invalid arguments", { element, items });
      return;
    }

    let htmlTxt = "";
    items.forEach((item) => {
      htmlTxt += generateArticleBox(item);
    });

    element.innerHTML = htmlTxt;
  };

  return {
    generate: generateArticleBox,
    displayArray,
    generateCartBox,
  };
})();

export default htmlHandler;
