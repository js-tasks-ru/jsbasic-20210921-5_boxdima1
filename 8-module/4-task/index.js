import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modalCart = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.count += 1;
      } else {
        cartItem = {
          ...product,
          count: 1
        };
        this.cartItems.push(cartItem);
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);
      }
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => (
      acc + item.count
    ), 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => (
      acc + item.count * item.price
    ), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  orderSuccessHtml() {
    return `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `;
  }

  renderModal() {
    this.modalCart.setTitle("Your order");
    this.setModalBody();
    const modalBody = this.modalCart.modal.querySelector('.modal__body');
    const cartForm = this.modalCart.modal.querySelector('.cart-form');
    modalBody.addEventListener('click', this.updateProductCountHandler);
    cartForm.addEventListener('submit', this.onSubmit);
    this.modalCart.open();
  }

  updateProductCountHandler = (event) => {
    const productCard = event.target.closest('[data-product-id]');
    if (productCard) {
      const productId = productCard.dataset.productId;
      const plusBtn = event.target.closest('.cart-counter__button_plus');
      const minusBtn = event.target.closest('.cart-counter__button_minus');
      if (plusBtn) {
        this.updateProductCount(productId, 1);
      } else if (minusBtn) {
        this.updateProductCount(productId, -1);
      }
    }
  }

  setModalBody() {
    const div = document.createElement('div');
    this.cartItems.forEach(item => div.append(this.renderProduct(item, item.count)));
    div.append(this.renderOrderForm());
    this.modalCart.setBody(div);
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        this.modalCart.close();
      } else {
        const productId = cartItem.id;
        if (cartItem.count === 0) {
          const productCard = this.modalCart.modal.querySelector(`[data-product-id="${productId}"]`);
          productCard.remove();
        } else {
          let productCount = this.modalCart.modal.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
          let productPrice = this.modalCart.modal.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
          let infoPrice = this.modalCart.modal.querySelector(`.cart-buttons__info-price`);
          productCount.innerHTML = cartItem.count;
          productPrice.innerHTML = `€${(cartItem.count * cartItem.price).toFixed(2)}`;
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.classList.add('is-loading');
    const form = event.currentTarget;
    fetch(
      'https://httpbin.org/post',
      {
        method: 'POST',
        body: new FormData(form)
      }
    ).then(response => {
      if (response.status === 200) {
        this.modalCart.setTitle('Success!');
        this.cartItems = [];
        this.cartIcon.update(this);
        const modalInner = this.modalCart.modal.querySelector('.modal__body');
        modalInner.innerHTML = this.orderSuccessHtml();
      }
    }).catch(error => {
      console.log(error);
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

