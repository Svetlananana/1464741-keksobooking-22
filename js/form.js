import { FLOAT }  from './data.js';
import { sendOffer } from './backend.js';

const ROOMS_COUNT = '100';
const CAPACITY_COUNT = '0';

const adForm = document.querySelector('.ad-form');
const typeSelectElement = adForm.querySelector('#type');
const priceInputElement = adForm.querySelector('#price');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const timeinSelectElement = adForm.querySelector('#timein');
const timeoutSelectElement = adForm.querySelector('#timeout');
const addressInputElement = adForm.querySelector('#address');
const roomNumberSelectElement = adForm.querySelector('#room_number');
const capacitySelectElement = adForm.querySelector('#capacity');

const formChildrenElements = adForm.children;
const formElements = Array.from(formChildrenElements);

const TypesMinPriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

export const setCapacityValue = () => {
  capacitySelectElement.value = roomNumberSelectElement.value;
};

const onRoomNumberSelectElementChange = () => {
  const roomsCount = roomNumberSelectElement.value;
  const capacityCount = capacitySelectElement.value;

  if (roomsCount !== ROOMS_COUNT && capacityCount === CAPACITY_COUNT) {
    capacitySelectElement.setCustomValidity(`Значение 'не для гостей' соответствует значению '${ROOMS_COUNT} комнат'.`);
  }
  else if (roomsCount === ROOMS_COUNT && capacityCount !== CAPACITY_COUNT) {
    capacitySelectElement.setCustomValidity(`Для '${ROOMS_COUNT} комнат' выбери значение 'не для гостей'.`);
  }
  else if (roomsCount < capacityCount ) {
    capacitySelectElement.setCustomValidity(' Для такого количества гостей выбери больше комнат.');
  } else {
    capacitySelectElement.setCustomValidity('');
  }
  capacitySelectElement.reportValidity();
};

const onTypeSelectElementChange = () => {
  const minPrice = TypesMinPriceMap[typeSelectElement.value];

  priceInputElement.min = minPrice;
  priceInputElement.placeholder = minPrice;
};

const onTimeCheckSelectElementChange = (elem) => {
  timeinSelectElement.value = elem.target.value;
  timeoutSelectElement.value = elem.target.value;
};

const addFormHandlers = () => {
  onTypeSelectElementChange();
  typeSelectElement.addEventListener('change', onTypeSelectElementChange);
  adFormElementTime.addEventListener('change', onTimeCheckSelectElementChange);

  setCapacityValue();
  roomNumberSelectElement.addEventListener('change', onRoomNumberSelectElementChange);
  capacitySelectElement.addEventListener('change', onRoomNumberSelectElementChange);
};

export const initializeForm = () => {
  addressInputElement.readOnly = true;
  addFormHandlers();
};

export const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  formElements.forEach((children) => {
    children.disabled = true;
  })
};

export const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach((children) => {
    children.disabled = false;
  })
};

export const setAdressValue = (lat, lng) => {
  addressInputElement.value = `${lat.toFixed(FLOAT)}, ${lng.toFixed(FLOAT)}`;
};


export const resetForm = () => {
  adForm.reset();
  document.querySelector('.map__filters').reset();
};

export const addSubmitHandler = (callback) => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (adForm.reportValidity()) {
      const formData = new FormData(evt.target);
      sendOffer(formData, callback)
    }
  };

  adForm.addEventListener('submit', (event) => {
    onFormSubmit(event);
  });
};
