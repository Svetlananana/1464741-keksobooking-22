import { disableFilter, enableFilter } from './filter.js';
import { enableForm, disableForm } from './form.js';

export const enablePage = () => {
  enableForm();
  enableFilter();
};

export const disablePage = () => {
  disableForm();
  disableFilter();
};
