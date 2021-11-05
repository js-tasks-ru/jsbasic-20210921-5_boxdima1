import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModal();
  }

  close = () => {
    this.body.classList.remove('is-modal-open');
    this.modal.remove();
    window.removeEventListener('keydown', this.closeEscape);
  }

  closeEscape = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  open() {
    this.body = document.body;
    this.body.append(this.modal);
    this.body.classList.add('is-modal-open');
    const close = this.modal.querySelector('.modal__close');
    close.addEventListener('click', this.close);
    window.addEventListener('keydown', this.closeEscape);
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(htmlBody) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(htmlBody);
  }

  createModal() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }
}
