const MAX_CARDS_COUNT = 10;

const filtersForm = document.querySelector('.map__filters');
const filterestElements = Array.from(filtersForm.children);

const filterType = filtersForm.querySelector('#housing-type');
const filterPrice = filtersForm.querySelector('#housing-price');
const filterRooms = filtersForm.querySelector('#housing-rooms');
const filterGuests = filtersForm.querySelector('#housing-guests');
const filterFeatures = filtersForm.querySelectorAll('.map__checkbox');


export const disableFilter = () => {
  filtersForm.classList.add('ad-form--disabled');
  filterestElements.forEach((children) => {
    children.disabled = true;
  })
};

export const enableFilter = () => {
  filtersForm.classList.remove('ad-form--disabled');
  filterestElements.forEach((children) => {
    children.disabled = false;
  })
};

const PriceRange = {
  LOW: 10000,
  HIGH: 50000,
};

const PriceValue = {
  ANY_VALUE: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
}

const checkOfferType = (offer) => {
  return filterType.value === PriceValue.ANY_VALUE || offer.offer.type === filterType.value;
};

const checkOfferPrice = (offer) => {
  switch (filterPrice.value) {

    case PriceValue.MIDDLE:
      return offer.offer.price >= PriceRange.LOW && offer.offer.price <= PriceRange.HIGH;

    case PriceValue.LOW:
      return offer.offer.price < PriceRange.LOW;

    case PriceValue.HIGH:
      return offer.offer.price >= PriceRange.HIGH;

    default:
      return true;
  }
};

const checkOfferRooms = (offer) => {
  return filterRooms.value === PriceValue.ANY_VALUE || offer.offer.rooms === +filterRooms.value;
};

const checkOfferGuests = (offer) => {
  return filterGuests.value === PriceValue.ANY_VALUE || offer.offer.guests === +filterGuests.value;
};

const getfilteringFeatures = () => {
  let filteringFeaturesOffers = [];

  filterFeatures.forEach((feature) => {
    if (feature.checked) {
      filteringFeaturesOffers.push(feature.value);
    }
  });

  return filteringFeaturesOffers;
};

const checkOfferFeatures = (offer) => {
  const checkedFeatures = getfilteringFeatures();
  return checkedFeatures.every((checkedFeature) => offer.offer.features.includes(checkedFeature));
};

const checkOffer = (offer) => {
  return checkOfferType(offer) &&
  checkOfferPrice(offer) &&
  checkOfferRooms(offer) &&
  checkOfferGuests(offer) &&
  checkOfferFeatures(offer);
};

const getFilteringOffers = (offers) => {
  const filteredOffers = [];

  for (let offer of offers) {

    if (checkOffer(offer)) {
      filteredOffers.push(offer)
    }

    if (filteredOffers.length === MAX_CARDS_COUNT) {
      break
    }
  }

  return filteredOffers;
};

export const resetFilter = () => {
  filtersForm.reset();
};

export const addFilterHandler = (callback, offers) => {

  const onFilterChange = () => {
    const filteredOffers = getFilteringOffers(offers);
    callback(filteredOffers);
  };

  filtersForm.addEventListener('change', onFilterChange);
};


// let offers = [];
// const getOffers = () => offers.slice(0);
// const setOffers = (newOffers) => offers = newOffers;

// И в других модулях const offers = getOffers();

//
