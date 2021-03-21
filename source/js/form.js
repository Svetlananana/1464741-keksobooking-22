import { FLOAT }  from './data.js';
import { sendOffer } from './backend.js';

const ROOMS_COUNT = '100';
const CAPACITY_COUNT = '0';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const TypesMinPriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const typeSelectElement = adForm.querySelector('#type');
const priceInputElement = adForm.querySelector('#price');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const timeinSelectElement = adForm.querySelector('#timein');
const timeoutSelectElement = adForm.querySelector('#timeout');
const addressInputElement = adForm.querySelector('#address');
const roomNumberSelectElement = adForm.querySelector('#room_number');
const capacitySelectElement = adForm.querySelector('#capacity');
const resetBotton = adForm.querySelector('.ad-form__reset');

const adFieldAvatar = adForm.querySelector('.ad-form__field input[type=file]');
const adPreview = adForm.querySelector('.ad-form-header__preview img');
const adUpload = adForm.querySelector('.ad-form__upload input[type=file]');
const adPhoto = adForm.querySelector('.ad-form__photo');

let defaultAvatarImg;

const formElements = Array.from(adForm.children);

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

const resetAvatarImg = () => {
  adPreview.src = defaultAvatarImg;
};

const resetFileImage = () => {
  adPhoto.innerHTML = '';
};

export const resetForm = () => {
  adForm.reset();
  resetAvatarImg();
  resetFileImage();
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

export const addResetHandler = (callback) => {
  const onFormReset = (evt) => {
    evt.preventDefault();
    callback();
  };

  resetBotton.addEventListener('click', onFormReset);
};


const onAvatarChange = (reader) => {
  adPreview.src = reader.result;
};

const onPhotoChange = (reader) => {
  resetFileImage(adPhoto);
  const imgElement = document.createElement('img');
  imgElement.alt = 'Фотография жилья';
  imgElement.style.maxWidth = '100%';

  imgElement.src = reader.result;

  adPhoto.append(imgElement);
};

const initializeReader = (element, fileTypes, onLoaded) => {
  element.addEventListener('change', () => {
    const file = element.files[0];
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some((it) => {
      return fileName.endsWith(it);
    })

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => onLoaded(reader));

      reader.readAsDataURL(file);
    }
  });
};

export const initializeForm = () => {
  addressInputElement.readOnly = true;
  defaultAvatarImg = adPreview.src;

  addFormHandlers();
  initializeReader(adFieldAvatar, FILE_TYPES, onAvatarChange);
  initializeReader(adUpload, FILE_TYPES, onPhotoChange);
};

