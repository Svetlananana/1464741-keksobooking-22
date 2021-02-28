import { createOffers } from './data.js';
import { addFormHandlers, initializeForm } from './form.js';
import { renderMarkers, initializeMap } from './map.js';
import { disablePage, enablePage } from './page.js';

const OFFERS_COUNT = 10;

const offers = createOffers(OFFERS_COUNT);

disablePage();

initializeForm();

initializeMap(() => {
  enablePage();
});

renderMarkers(offers);

addFormHandlers();
