import { TYPES } from './const.js';

const roomsLabel = (roomsCount) => {
  if (roomsCount === 1) {
    return 'комната';
  }
  return roomsCount <= 4 ? 'комнаты' : 'комнат';
};

const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createOfferPopup = ({offer}) => {

  const offerElement = similarOfferTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${roomsLabel(offer.rooms)} для ${offer.guests} гостей`;

  const elementDescription = offerElement.querySelector('.popup__description');
  if (offer.description === '') {
    elementDescription.textContent = '';
    elementDescription.hidden = true;
  } else {
    elementDescription.textContent = offer.description;
  }

  const featureList = offerElement.querySelectorAll('.popup__feature');
  if (Object.hasOwn(offer, 'features')) {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  } else {
    featureList.forEach((featureListItem) => {
      featureListItem.remove();
    });
  }

  const offerPhotos = offerElement.querySelector('.popup__photos');
  const templatePhoto = offerPhotos.querySelector('.popup__photo');
  if (Object.hasOwn(offer, 'photos')) {
    offer.photos.forEach((photo) => {
      const photoElement = templatePhoto.cloneNode(true);
      photoElement.src = photo;
      offerPhotos.appendChild(photoElement);
    });
  }

  templatePhoto.remove();

  return offerElement;
};

export { createOfferPopup };
