'use strict'

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomFixedFloat = (min, max, range = 1) => {
  let errorMessage =  '';
  if (min >= max) {
    errorMessage = 'Значение "от" не может быть меньше чем "до"';
  }
  if (min < 0 || max < 0) {
    errorMessage = 'Значения "от" и "до" не могут быть меньше нуля';
  }
  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const value = getRandomFloat(min, max);
  return Number(value.toFixed(range));
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return getRandomFixedFloat(min, max, 0);
};

///// * ///// * ///// * /////


const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const OBJECT_COUNT = 10;

const getRandomBoolean = () => Boolean(getRandomNumber(0, 1));

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length -1)];
};

const getRandomArrayItems = (array) => {
  return array.filter(getRandomBoolean);
};

const createOffer = () => {
  const avatar = `img/avatars/user0${getRandomNumber(1, 8)}.png`;

  const title = 'Хижина в сказочном лесу';

  const price = getRandomNumber(1, 100);
  const type = getRandomArrayItem(TYPES);
  const rooms = getRandomNumber(1, 9);
  const guests = getRandomNumber(1, 9);

  const description = 'Чистое-шелковистое помещение для крепкого сна';

  const x = getRandomFixedFloat(35.65000, 35.70000, 5);
  const y = getRandomFixedFloat(139.70000, 139.80000, 5);
  const address = `${x}, ${y}`;

  const features = getRandomArrayItems(FEATURES);
  const photos = getRandomArrayItems(PHOTOS);

  const time = getRandomArrayItem(CHECK_TIMES);

  return {
    author: {
      avatar,
    },

    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin: time,
      checkout: time,
      features,
      description,
      photos,
    },

    location: {
      x,
      y,
    },
  }
};

const OFFERS = new Array(OBJECT_COUNT).fill('').map(() => createOffer());
OFFERS; // что бы линтер не ругался
//
