const adForm = document.querySelector('.ad-form');
const typeSelectElement = adForm.querySelector('#type');
const priceInputElement = adForm.querySelector('#price');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const timeinSelectElement = adForm.querySelector('#timein');
const timeoutSelectElement = adForm.querySelector('#timeout');

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

