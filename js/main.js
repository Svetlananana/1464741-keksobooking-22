'use strict'

const getRandomFloat = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
};


const getRandonFixedFloat = (min, max, range = 1) => {
  let errorMessage =  'Не корректное значение "от" или "до"';
  if (min >= max || min < 0 || max < 0) {
    throw new Error(errorMessage)
  }

  const value = getRandomFloat(min, max);
  return value.toFixed(range);
};

const getRandomNumber = (min, max) => {
  return getRandonFixedFloat(min, max, 0);
};


getRandomNumber();
