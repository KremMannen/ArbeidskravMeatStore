import ProductModule from "./modules/ProductModule.js";
import ProductBoxTemplate from "./modules/ProductBoxTemplate.js";

const productSection = document.querySelector(".products-section");
const template = ProductBoxTemplate();

const showAllProducts = () => {
  const allProducts = ProductModule.getAll();
  let htmlTxt = "";

  allProducts.forEach((product) => {
    htmlTxt += template.createProductHTML(product);
  });
  productSection.innerHTML = htmlTxt;
};

(() => {
  showAllProducts();
})();
