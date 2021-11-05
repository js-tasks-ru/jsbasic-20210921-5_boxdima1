import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.body.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
    const response = await fetch('products.json');
    this.products = await response.json();
    this.productGrid = new ProductsGrid(this.products);
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
    });
    document.body.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.body.querySelector('[data-products-grid-holder]').append(this.productGrid.elem);
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const product = this.products.find(product => product.id === event.detail);
      this.cart.addProduct(product);
    });
    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productGrid.updateFilter({maxSpiciness: event.detail});
    });
    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productGrid.updateFilter({category: event.detail});
    });
    const nutsCheckbox = document.body.querySelector('#nuts-checkbox');
    nutsCheckbox.addEventListener('change', (event) => {
      this.productGrid.updateFilter({noNuts: event.currentTarget.checked});
    });
    const vegeterianCheckbox = document.body.querySelector('#vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', (event) => {
      this.productGrid.updateFilter({vegeterianOnly: event.currentTarget.checked});
    });
  }
}
