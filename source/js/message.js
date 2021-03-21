import { isMainButton, isEscapeKey } from './utils.js';

const ZINDEX_MESSAGE = 1000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');

export const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  successElement.style.zIndex = ZINDEX_MESSAGE;

  const onDocumentEvent = (evt) => {
    if (isMainButton(evt) || isEscapeKey(evt)) {
      successElement.remove();
      document.removeEventListener('click', onDocumentEvent);
      document.removeEventListener('keydown', onDocumentEvent);
    }
  };

  document.addEventListener('click', onDocumentEvent);
  document.addEventListener('keydown',onDocumentEvent);

  main.appendChild(successElement);
};


export const showError = (errorText) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  errorElement.style.zIndex = ZINDEX_MESSAGE;

  if (errorText) {
    const message = errorElement.querySelector('.error__message');
    message.textContent = errorText;
  }

  const closeMessage = () => {
    errorElement.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscapePressed);
  }

  const onDocumentClick = (event) => {
    if (!errorElement.contains(event.target)) {
      closeMessage();
    }
  }

  const onDocumentEscapePressed = (event) => {
    if (isEscapeKey(event)) {
      closeMessage();
    }
  }

  const onButtonClick = (event) => {
    if (isMainButton(event)) {
      closeMessage();
    }
  }
  errorButton.addEventListener('click', onButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscapePressed);

  main.appendChild(errorElement);
};
