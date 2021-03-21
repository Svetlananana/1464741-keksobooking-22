import debounce from 'lodash/debounce';

import { initializeForm, addSubmitHandler, resetForm, setCapacityValue, addResetHandler } from './form.js';
import { renderMarkers, initializeMap } from './map.js';
import { disablePage, enablePage } from './page.js';
import { getOffers } from './backend.js';
import { addFilterHandler, resetFilter } from './filter.js';

const DEBOUNCE_TIME = 500;

disablePage();
initializeForm();

getOffers()
  .then((offers) => {
    initializeMap(() => {
      enablePage();
      renderMarkers(offers);
    });

    addSubmitHandler(() => {
      resetFilter();
      resetForm();
      initializeMap();
      setCapacityValue();
      renderMarkers(offers);
    });

    addResetHandler(() => {
      resetFilter();
      resetForm();
      initializeMap();
      setCapacityValue();
      renderMarkers(offers);
    });

    addFilterHandler(
      debounce(renderMarkers, DEBOUNCE_TIME),
      offers,
    );
  });


