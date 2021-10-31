import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };
    this.render();
  }

  render() {
    this.productGrid = this.createProductGrid();
    this.productGridInner = this.productGrid.querySelector('.products-grid__inner');
    this.updateProducts();
  }

  updateProducts() {
    this.productGridInner.innerHTML = "";
    this.filteredProducts.forEach(product => {
      const newProduct = new ProductCard(product);
      this.productGridInner.append(newProduct.elem);
    });
  }

  updateFilter(filter) {
    this.filters = {...this.filters, ...filter};
    this.filteredProducts = this.products.filter(product => (
      product.nuts !== this.filters.noNuts &&
      (product.vegeterian === this.filters.vegeterianOnly || this.filters.vegeterianOnly === false) &&
      (product.category === this.filters.category || this.filters.category === "") &&
      product.spiciness <= this.filters.maxSpiciness
    ));
    this.updateProducts();
  }

  createProductGrid() {
    return createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `);
  }

  get elem() {
    return this.productGrid;
  }
}
