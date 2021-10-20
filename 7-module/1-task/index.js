import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.scrollTimeout = () => {
    };
    this.render();
  }

  render() {
    this._ribbon = this.createRibbon();
    this._ribbonInner = this._ribbon.querySelector('.ribbon__inner');
    for (const [idx, item] of this.categories.entries()) {
      const link = this.createRibbonItem(item);
      if (idx === 0) {
        link.classList.add('ribbon__item_active');
      }
      this._ribbonInner.append(link);
      this._ribbonInner.addEventListener('scroll', this.hideArrowHandler);
      this._ribbonInner.addEventListener('click', this.changeCategoryHandler);
      this.addScroll();
    }
  }

  changeCategoryHandler = (event) => {
    if (event.target.tagName === 'A') {
      let newSelectedCategory = event.target;
      let oldSelectedCategory = this._ribbonInner.querySelector('.ribbon__item_active');
      oldSelectedCategory.classList.remove('ribbon__item_active');
      newSelectedCategory.classList.add('ribbon__item_active');
      const customEvent = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      });
      this._ribbon.dispatchEvent(customEvent);
    }
  }

  addScroll() {
    this._leftScrollArrow = this._ribbon.querySelector('.ribbon__arrow_left');
    this._rightScrollArrow = this._ribbon.querySelector('.ribbon__arrow_right');
    this._leftScrollArrow.addEventListener('click', this.scrollLeftHandler);
    this._rightScrollArrow.addEventListener('click', this.scrollRightHandler);
  }

  hideArrowHandler = () => {
    clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(this.scrollHandler, 50);
  }

  scrollHandler = () => {
    let scrollLeft = this._ribbonInner.scrollLeft;
    let scrollWidth = this._ribbonInner.scrollWidth;
    let clientWidth = this._ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft === 0) {
      this._leftScrollArrow.classList.remove('ribbon__arrow_visible');
    } else {
      this._leftScrollArrow.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this._rightScrollArrow.classList.remove('ribbon__arrow_visible');
    } else {
      this._rightScrollArrow.classList.add('ribbon__arrow_visible');
    }
  }

  scrollLeftHandler = () => {
    this._ribbonInner.scrollBy(-350, 0);
  }

  scrollRightHandler = () => {
    this._ribbonInner.scrollBy(350, 0);
  }

  createRibbonItem(item) {
    return createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
    `);
  }

  createRibbon() {
    return createElement(`
      <div class="ribbon">

        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  get elem() {
    return this._ribbon;
  }
}
