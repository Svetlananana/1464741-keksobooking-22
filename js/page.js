import { disableFilterMapForm, enableFilterMapForm } from './filter.js';
import { enableForm, disableForm } from './form.js';

export const enablePage = () => {
  enableForm();
  enableFilterMapForm();
};

export const disablePage = () => {
  disableForm();
  disableFilterMapForm();
};
