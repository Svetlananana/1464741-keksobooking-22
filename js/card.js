
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const photoTemplate = cardTemplate.querySelector('.popup__photo');


const TypesMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const createFeaturesElement = (element, features) => {
  const fragment = document.createDocumentFragment();
  element.innerHTML = '';

  features.forEach((feature) => {
    const elementFeature = document.createElement('li');
    elementFeature.classList.add('popup__feature');
    elementFeature.classList.add(`popup__feature--${feature}`);
    fragment.append(elementFeature);
  })
  element.append(fragment);
};

const fillPhotosElement = (element, photos) => {
  element.innerHTML = '';
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const elementPhoto = photoTemplate.cloneNode(true);
    elementPhoto.src = photo;
    fragment.append(elementPhoto);
  })
  element.append(fragment);
};

export const createCard = (offer) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextAddress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupFeatures = cardElement.querySelector('.popup__features');

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer.offer;

  const {
    avatar,
  } = offer.author;

  avatar ? popupAvatar.src = avatar : cardElement.removeChild(popupAvatar);
  title ? popupTitle.textContent = title : cardElement.removeChild(popupTitle);
  address ? popupTextAddress.textContent = address : cardElement.removeChild(popupTextAddress);
  price ? popupTextPrice.textContent = `${price}₽/ночь` : cardElement.removeChild(popupTextPrice);
  type ? popupType.textContent = TypesMap[type] : cardElement.removeChild(popupType);
  rooms && guests ? popupTextCapacity.textContent = `${rooms} комнаты для ${guests} гостей` : cardElement.removeChild(popupTextCapacity);
  checkin && checkout ? popupTextTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : cardElement.removeChild(popupTextTime);
  description ? popupDescription.textContent = description : cardElement.removeChild(popupDescription);

  features.length ? createFeaturesElement(popupFeatures, features) : cardElement.removeChild(popupFeatures);
  photos.length ? fillPhotosElement(popupPhotos, photos) : cardElement.removeChild(popupPhotos);


  return cardElement;
};

export const createCards = (offers) => {
  const cardElements = [];
  offers.forEach((offer) => {
    const cardElement = createCard(offer);
    cardElements.push(cardElement);
  });
  return cardElements;

//  return offers.map((offer) => createCard(offer)); пусть пока останется плз
};

export const renderCard = (cardElement) => {
  mapCanvas.appendChild(cardElement);
};
