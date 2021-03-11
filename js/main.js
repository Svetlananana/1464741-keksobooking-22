import { initializeForm, addSubmitHandler, resetForm, setCapacityValue } from './form.js';
import { renderMarkers, initializeMap } from './map.js';
import { disablePage, enablePage } from './page.js';
import { getOffers } from './backend.js';


getOffers()
  .then((offers) => {
    disablePage();

    initializeForm();

    initializeMap(() => {
      enablePage();
    });

    renderMarkers(offers);

    addSubmitHandler(() => {
      resetForm();
      initializeMap();
      setCapacityValue();
    });
  });


