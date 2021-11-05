import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    this.carousel = this.createCarousel();
    const carouselInner = this.carousel.querySelector('.carousel__inner');
    for (let slide of this.slides) {
      const carouselSlide = this.createSlide(slide);
      const btn = carouselSlide.querySelector('.carousel__button');
      btn.addEventListener('click', this.onClick);
      carouselInner.append(carouselSlide);
    }
    this.initCarousel();
  }

  onClick = (event) => {
    const targetId = event.target.closest('.carousel__slide').dataset.id;
    const productAdd = new CustomEvent("product-add", {
      detail: targetId,
      bubbles: true
    });
    this.carousel.dispatchEvent(productAdd);
  }

  initCarousel() {
    const rightArrow = this.carousel.querySelector('.carousel__arrow_right');
    const leftArrow = this.carousel.querySelector('.carousel__arrow_left');
    const slider = this.carousel.querySelector('.carousel__inner');
    const slidesNumber = this.slides.length;
    let translate = 0;
    leftArrow.style.display = 'none';

    const checkArrows = () => {
      leftArrow.style.display = translate === 0 ? 'none' : '';
      rightArrow.style.display = translate === slider.offsetWidth * (slidesNumber - 1) * -1 ? 'none' : '';
    };

    rightArrow.addEventListener('click', () => {
      translate -= slider.offsetWidth;
      slider.style.transform = `translateX(${translate}px)`;
      checkArrows();
    });
    leftArrow.addEventListener('click', () => {
      translate += slider.offsetWidth;
      slider.style.transform = `translateX(${translate}px)`;
      checkArrows();
    });
  }

  createSlide(slide) {
    return createElement(`
      <div class="carousel__slide" data-id=${slide.id}>
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  createCarousel() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);
  }

  get elem() {
    return this.carousel;
  }
}
