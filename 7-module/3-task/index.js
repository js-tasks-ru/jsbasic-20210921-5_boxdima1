import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    this._slider = this.createSlider();
    this.createSliderSteps();
    this._slider.addEventListener('click', this.sliderStepHandler);
  }

  sliderStepHandler = (event) => {
    const [value, valuerPercents] = this.getSliderValues(event);
    this.changeStepActive(value);
    this.changeSliderProgress(valuerPercents);
    const customEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    this._slider.dispatchEvent(customEvent);
  }

  changeSliderProgress(valuerPercents) {
    let thumb = this._slider.querySelector('.slider__thumb');
    let progress = this._slider.querySelector('.slider__progress');
    thumb.style.left = `${valuerPercents}%`;
    progress.style.width = `${valuerPercents}%`;
  }

  changeStepActive(value) {
    const sliderValue = this._slider.querySelector('.slider__value');
    sliderValue.textContent = value;
    const activeStep = this.sliderSteps.querySelector('.slider__step-active');
    if (activeStep) {
      activeStep.classList.remove('slider__step-active');
    }
    this.sliderSteps.children[value].classList.add('slider__step-active');
  }

  getSliderValues(event) {
    let left = event.clientX - this._slider.getBoundingClientRect().left;
    let leftRelative = left / this._slider.offsetWidth;
    let segment = this.steps - 1;
    let approximateValue = leftRelative * segment;
    let value = Math.round(approximateValue);
    let valuerPercents = value / segment * 100;
    return [value, valuerPercents];
  }

  createSliderSteps() {
    this.sliderSteps = this._slider.querySelector('.slider__steps');
    for (let i = 0; i <= this.steps - 1; i++) {
      const span = document.createElement('span');
      this.sliderSteps.append(span);
      if (i === 0) {
        span.classList.add('slider__step-active');
      }
    }
  }

  createSlider() {
    return createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);
  }

  get elem() {
    return this._slider;
  }
}
