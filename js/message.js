import { isEscapeKey } from './util.js';
function showSuccessMessage() {
  const template = document.querySelector('#success').content.cloneNode(true);
  const message = template.querySelector('.success');
  message.style.zIndex = '10000';
  document.body.appendChild(message);

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      close();
    }
  }

  function close() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  }

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      close();
    }
  });

  message.querySelector('.success__button').addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
}

function showErrorMessage() {
  const template = document.querySelector('#error').content.cloneNode(true);
  const message = template.querySelector('.error');
  message.style.zIndex = '10000';
  document.body.appendChild(message);

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      close();
    }
  }

  function close() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  }

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      close();
    }
  });

  message.querySelector('.error__button').addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
}


export { showSuccessMessage, showErrorMessage };
