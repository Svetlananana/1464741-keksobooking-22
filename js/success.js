import { isMainButton, isEscapeKey } from './utils.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');

export const onSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);

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

export const onErrorMessage = (errorText) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  if (errorText) {
    const message = errorElement.querySelector('.error__message');
    message.textContent = errorText;
  }

  const onDocumentEvent = (evt) => {
    if (isMainButton(evt) || isEscapeKey(evt)) {
      errorElement.remove();
      document.removeEventListener('click', onDocumentEvent);
      document.removeEventListener('keydown',onDocumentEvent);
    }
  }
  
  errorButton.addEventListener('click', onDocumentEvent);
  document.addEventListener('click', onDocumentEvent);
  document.addEventListener('keydown',onDocumentEvent);

  main.appendChild(errorElement);
};

// const MessageType = {
//   SUCCESS:'success',
//   ERROR: 'error',
// }

// showMessage = (messageType, text) => {
//   const template = document.querySelector(`#${messageType}`)
// .content.querySelector(`.${messageType}`);
//   const message = template.cloneNode(true);

//   const textElement = message.querySelector('p');
//   textElement.textContent = text;

//   if (messageType === MessageType.ERROR) {
//     const nahuy = console.log('naguy');
//   }
// }
// const showError = (text) => {
//   showMessage(MessageType.ERROR, text);
// }

// const showSuccess = (text) => {
//   showMessage(MessageType.SUCCESS, text);
// }


