import { createOffers }  from './data.js';
import { addFormHandlers, initializeForm } from './form.js';
import { renderMarkers, addMainPinHandlers, initializeMap } from './map.js';
import './map.js';

export const OFFERS_COUNT = 10;

const offers = createOffers(OFFERS_COUNT);

initializeForm();

renderMarkers(offers);
initializeMap();
addMainPinHandlers();

addFormHandlers();
