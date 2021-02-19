

const adForm = document.querySelector('.ad-form');
const typeSelectElement = adForm.querySelector('#type'); // список предложений
const priceInputElement = adForm.querySelector('#price'); // цена

const timeinSelectElement = adForm.querySelector('#timein'); // время заезда
const timeoutSelectElement = adForm.querySelector('#timeout'); // время выезда

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
onTypeSelectElementChange();

export const addPriceHandler = () => {
  typeSelectElement.addEventListener('change', onTypeSelectElementChange);
};

addPriceHandler();

///////

const ontimeinSelectElementChange = () => {
  timeoutSelectElement.value = timeinSelectElement.value;
};

const ontimeoutSelectElementChange = () => {
  timeinSelectElement.value = timeoutSelectElement.value;
};

export const addTimeHandler = () => {
  timeinSelectElement.addEventListener('change', ontimeinSelectElementChange);
  timeoutSelectElement.addEventListener('change', ontimeoutSelectElementChange);
};

addTimeHandler();

// Второй способ реализации синхрона временных полей

const adFormElementTime = adForm.querySelector('.ad-form__element--time');

const onTimeCheckSelectElementChange = (elem) => {
  timeinSelectElement.value = elem.target.value;
  timeoutSelectElement.value = elem.target.value;
};

adFormElementTime.addEventListener('change', onTimeCheckSelectElementChange);
