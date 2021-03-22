const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return getRandomFixedFloat(min, max, 0);
};

const getRandomBoolean = () => Boolean(getRandomNumber(0, 1));

export const getRandomFixedFloat = (min, max, range = 1) => {
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

export const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length -1)];
};

export const getRandomArrayItems = (array) => {
  return array.filter(getRandomBoolean);
};

export const isMainButton = (evt) => evt.button === 0;
export const isEscapeKey = (evt) => evt.key === 'Escape';
