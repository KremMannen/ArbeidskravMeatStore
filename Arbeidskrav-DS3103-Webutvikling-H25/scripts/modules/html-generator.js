// html-generator.js
const htmlGenerator = (product) => {
  const pricePerKg = (product.priceNOK * 1000) / product.weightInGrams;

  return `
    <article class="product-box xs-12 sm-4 md-3">
      <img class="product-box__image img-responsive" src="../images/${
        product.imgName
      }" alt="picture of ${product.imgName}">
      
      <h2 class="product-box__title">${product.name}</h2>
      <h3 class="product-box__weight">${product.weightInGrams}g ${
    product.producer
  }</h3>
      
      <p class="product-box__info">${product.info}</p>
      
      <div class="product-box__bottom">
        <div class="product-box__price-info">
          <h1 class="product-box__price">${product.priceNOK}kr</h1>
          <p class="product-box__kg-price">${pricePerKg.toFixed(2)} kr/kg</p>
        </div>
        <button class="product-box__button product-box__button--purchase">
          <i class="fa-solid fa-cart-shopping fa-xl"></i>
        </button>
      </div>
    </article>
  `;
};

export default htmlGenerator;
