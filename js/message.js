import { isEscapeKey } from './util.js';

const MESSAGE_Z_INDEX = 10000;

function showSuccessMessage() {
  const template = document.querySelector('#success').content.cloneNode(true);
  const message = template.querySelector('.success');
  const successButton = message.querySelector('.success__button');

  message.style.zIndex = MESSAGE_Z_INDEX;
  document.body.appendChild(message);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onSuccessClose();
    }
  };

  const onOverlayClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      onSuccessClose();
    }
  };

  function onSuccessClose() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  message.addEventListener('click', onOverlayClick);
  successButton.addEventListener('click', onSuccessClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

function showErrorMessage() {
  const template = document.querySelector('#error').content.cloneNode(true);
  const message = template.querySelector('.error');
  const errorButton = message.querySelector('.error__button');

  message.style.zIndex = MESSAGE_Z_INDEX;
  document.body.appendChild(message);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onErrorClose();
    }
  };

  const onOverlayClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      onErrorClose();
    }
  };

  function onErrorClose() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  message.addEventListener('click', onOverlayClick);
  errorButton.addEventListener('click', onErrorClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

export { showSuccessMessage, showErrorMessage };
