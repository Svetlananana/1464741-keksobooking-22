import { createOffers }  from './data.js';
import { createCards, renderCard } from './card.js';
import { addFormHandlers } from './form.js'

const OFFERS_COUNT = 10;
const offers = createOffers(OFFERS_COUNT);

const cardElements = createCards(offers);
renderCard(cardElements[0]);

addFormHandlers();

