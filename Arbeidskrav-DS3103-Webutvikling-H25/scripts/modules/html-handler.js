// html-generator.js
const htmlHandler = (() => {
  const generateArticleBox = (product, span) => {
    const pricePerKg = (product.priceNOK * 1000) / product.weightInGrams;

    return `
      <article class="product-box xs-12 sm-4 ${span}" data-id="${product.id}">
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
      <article class="cart-box xs-12 md-6" data-id="${product.id}">
        <div class="cart-box__content">
          <div class="cart-box__info-section">
            <h2 class="cart-box__title">${product.name}</h2>
            <h3 class="cart-box__weight">${product.weightInGrams}g ${
      product.producer || ""
    }</h3>
            <div class="cart-box__bottom">
              <div class="cart-box__price-info">
                <h1 class="cart-box__price">${product.priceNOK}kr</h1>
                <p class="cart-box__kg-price">${pricePerKg.toFixed(2)} kr/kg</p>
              </div>
              <div class="cart-box__button-container">
                <button class="cart-box__button cart-box__button-subtract" data-id="${
                  product.id
                }">-</button>
                <p class="cart-box__product-counter" data-id="${product.id}">
  ${product.quantity}
</p>
                <button class="cart-box__button cart-box__button-add" data-id="${
                  product.id
                }">+</button>
              </div>
            </div>
          </div>
          
          <div class="cart-box__image-section">
            <img class="cart-box__image img-responsive" src="../images/${
              product.imgName
            }" alt="picture of ${product.imgName}">
          </div>
        </div>
      </article>
    `;
  };

  const generateTotalPriceBox = (total) => `
  <article class="cart-section__totalprice xs-12">
    <h1 class="cart-section__totalprice--header">Total: ${total}kr</h1>
  </article>
`;

  const generateAd = (ad) => {
    return `
      <article class="cart-box xs-12 md-6" data-id="${product.id}">
        <div class="cart-box__content">
          <div class="cart-box__info-section">
            <h2 class="cart-box__title">${product.name}</h2>
            <h3 class="cart-box__weight">${product.weightInGrams}g ${
      product.producer || ""
    }</h3>
            <div class="cart-box__bottom">
              <div class="cart-box__price-info">
                <h1 class="cart-box__price">${product.priceNOK}kr</h1>
                <p class="cart-box__kg-price">${pricePerKg.toFixed(2)} kr/kg</p>
              </div>
              <div class="cart-box__button-container">
                <button class="cart-box__button cart-box__button-subtract" data-id="${
                  product.id
                }">-</button>
                <p class="cart-box__product-counter" data-id="${product.id}">
  ${product.quantity}
</p>
                <button class="cart-box__button cart-box__button-add" data-id="${
                  product.id
                }">+</button>
              </div>
            </div>
          </div>
          
          <div class="cart-box__image-section">
            <img class="cart-box__image img-responsive" src="../images/${
              product.imgName
            }" alt="picture of ${product.imgName}">
          </div>
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
    generateArticleBox,
    displayArray,
    generateCartBox,
    generateTotalPriceBox,
  };
})();

export default htmlHandler;
