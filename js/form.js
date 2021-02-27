import { FLOAT }  from './data.js';

const adForm = document.querySelector('.ad-form');
const typeSelectElement = adForm.querySelector('#type');
const priceInputElement = adForm.querySelector('#price');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const timeinSelectElement = adForm.querySelector('#timein');
const timeoutSelectElement = adForm.querySelector('#timeout');
const addressInputElement = adForm.querySelector('#address');

const TypesMinPriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const onTypeSelectElementChange= () => {
  const minPrice = TypesMinPriceMap[typeSelectElement.value];

  priceInputElement.min = minPrice;
  priceInputElement.placeholder = minPrice;
};

const onTimeCheckSelectElementChange = (elem) => {
  timeinSelectElement.value = elem.target.value;
  timeoutSelectElement.value = elem.target.value;
};

export const addFormHandlers = () => {
  onTypeSelectElementChange();
  typeSelectElement.addEventListener('change', onTypeSelectElementChange);
  adFormElementTime.addEventListener('change', onTimeCheckSelectElementChange);
};

export const initializeForm = () => {
  addressInputElement.setAttribute('readonly', true);
}; // main

const formChildrenElements = adForm.children;
const formElements = Array.from(formChildrenElements);

export const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  formElements.forEach((children) => {
    children.setAttribute.disabled = true;
  })
};

export const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach((children) => {
    children.removeAttribute.disabled = false;
  })
};

export const setAdressValue = (lat, lng) => {
  addressInputElement.value = `${lat.toFixed(FLOAT)}, ${lng.toFixed(FLOAT)}`;
};
