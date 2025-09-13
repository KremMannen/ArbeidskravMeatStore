import ProductModule from "./modules/inventory.js";
import ProductBoxTemplate from "./modules/html-generator.js";

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
