import { showSuccess, showError } from './message.js';

export const BASE_URL = 'https://22.javascript.pages.academy/keksobooking';

export const getOffers = () => {
  return fetch(`${BASE_URL}/data`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error ();
    })
    .catch(() => showError('Не удалось загрузить объявление'))
};

export const sendOffer = (data, onSuccess) => {
  return fetch((BASE_URL),
    {
      method: 'POST',
      body: data,
    },
  )
    .then ((response) => {
      if (response.ok) {
        return showSuccess()
      }
      throw new Error();
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => showError('Упс.. Ошибочка вышла! Форма заполнена не верно'));
};
