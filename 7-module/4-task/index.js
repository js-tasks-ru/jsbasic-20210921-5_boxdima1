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
    this.thumb = this._slider.querySelector('.slider__thumb');
    this.progress = this._slider.querySelector('.slider__progress');
    this.defaultDragAndDropOff();
    this.dragAndDropActivate();
  }

  dragAndDropActivate() {
    this.thumb.onpointerdown = this.pointerDown;
  }

  pointerDown = () => {
    this._slider.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.onpointerup = this.onPointerUp;
  }

  onPointerUp = (event) => {
    document.removeEventListener('pointermove', this.onPointerMove);
    this._slider.classList.remove('slider_dragging');
    this.thumb.onpointerup = null;
    this.sliderStepHandler(event);
  }

  onPointerMove = (event) => {
    this.moveAt(event.clientX);
  }

  moveAt = (event) => {
    let leftRelative = this.getLeftRelative(event);
    let leftPercents = leftRelative * 100;
    this.changeSliderProgress(leftPercents);
    this.changeValue(leftRelative);
    this.changeStepActive();
  }

  defaultDragAndDropOff() {
    let thumb = this._slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
  }

  getLeftRelative(event) {
    let left = event - this._slider.getBoundingClientRect().left;
    let leftRelative = left / this._slider.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    return leftRelative;
  }

  changeValue = (leftRelative) => {
    let segment = this.steps - 1;
    let approximateValue = leftRelative * segment;
    this.value = Math.round(approximateValue);
  }

  sliderStepHandler = (event) => {
    let leftRelative = this.getLeftRelative(event.clientX);
    this.changeValue(leftRelative);
    this.changeStepActive();
    let valuerPercents = this.value / (this.steps - 1) * 100;
    this.changeSliderProgress(valuerPercents);
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this._slider.dispatchEvent(customEvent);
  }

  changeSliderProgress(valuerPercents) {
    this.thumb.style.left = `${valuerPercents}%`;
    this.progress.style.width = `${valuerPercents}%`;
  }

  changeStepActive() {
    const sliderValue = this._slider.querySelector('.slider__value');
    sliderValue.textContent = this.value;
    const activeStep = this.sliderSteps.querySelector('.slider__step-active');
    if (activeStep) {
      activeStep.classList.remove('slider__step-active');
    }
    this.sliderSteps.children[this.value].classList.add('slider__step-active');
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
