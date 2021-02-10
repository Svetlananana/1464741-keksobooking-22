import {
  getRandomNumber,
  getRandomFixedFloat,
  getRandomArrayItem,
  getRandomArrayItems
} from './utils.js';

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const MIN_VALUE = 1;
const MAX_AVATAR = 8;
const MAX_PRICE = 100;
const MAX_ROOMS = 9;
const MAX_QUESTS = 15;
const MIN_X = 35.65000;
const MAX_X = 35.70000;
const MIN_Y = 139.70000;
const MAX_Y = 139.80000;
const FLOAT = 5;


const createOffer = () => {

  const avatar = `img/avatars/user0${getRandomNumber(MIN_VALUE, MAX_AVATAR)}.png`;

  const title = 'Хижина в сказочном лесу';
  const price = getRandomNumber(MIN_VALUE, MAX_PRICE);
  const type = getRandomArrayItem(TYPES);
  const rooms = getRandomNumber(MIN_VALUE, MAX_ROOMS);
  const guests = getRandomNumber(MIN_VALUE, MAX_QUESTS);
  const description = 'Чистое-шелковистое помещение для крепкого сна';

  const x = getRandomFixedFloat(MIN_X, MAX_X, FLOAT);
  const y = getRandomFixedFloat(MIN_Y, MAX_Y, FLOAT);
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

export const createOffers = (count) => {
  return new Array(count).fill('').map(() => createOffer())
};
