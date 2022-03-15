const typesView = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const roomsLabel = (roomsCount) => {
  if (roomsCount === 1) return 'комната';
  return roomsCount <= 4 ? 'комнаты' : 'комнат';
}

const mapCanvas = document.querySelector('#map-canvas');

const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderOffers = (offers) => {

  const similarListFragment = document.createDocumentFragment();

  offers.forEach(({offer}) => {

    const offerElement = similarOfferTemplate.cloneNode(true);

    offerElement.querySelector('.popup__title').textContent = offer.title;
    offerElement.querySelector('.popup__text--address').textContent = offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    offerElement.querySelector('.popup__type').textContent = typesView[offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${roomsLabel(offer.rooms)} для ${offer.guests} гостей`;

    const elementDescription = offerElement.querySelector('.popup__description');
    if (offer.description === '') {
      elementDescription.textContent = '';
      elementDescription.classList.add('hidden');
    } else {
      elementDescription.textContent = offer.description;
    }


    const featureList = offerElement.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((feature) => 'popup__feature--' + feature);
    featureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });

    const offerPhotos = offerElement.querySelector('.popup__photos');
    const templatePhoto = offerPhotos.querySelector('.popup__photo');
    offer.photos.forEach((photo) => {
      const photoElement = templatePhoto.cloneNode(true);
      photoElement.src = photo;
      offerPhotos.appendChild(photoElement);
    });
    templatePhoto.remove();

    similarListFragment.appendChild(offerElement);
  });

  mapCanvas.appendChild(similarListFragment);
}

export { renderOffers };
