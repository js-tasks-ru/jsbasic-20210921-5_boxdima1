function initCarousel() {
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const slider = document.querySelector('.carousel__inner');
  const carousel = document.querySelector('.carousel');
  const slidesNumber = slider.children.length;
  let translate = 0;
  leftArrow.style.display = 'none';

  carousel.addEventListener('click', () => {
    leftArrow.style.display = translate === 0 ? 'none' : '';
    rightArrow.style.display = translate === slider.offsetWidth * (slidesNumber - 1) * -1 ? 'none' : '';
  });

  rightArrow.addEventListener('click', () => {
    translate -= slider.offsetWidth;
    slider.style.transform = `translateX(${translate}px)`;
  });
  leftArrow.addEventListener('click', () => {
    translate += slider.offsetWidth;
    slider.style.transform = `translateX(${translate}px)`;
  });
}
