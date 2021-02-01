'use strict'

const getRandomFloat = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
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


getRandomNumber();
