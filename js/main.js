import { createOfferPopup } from './offers-markup.js';
import { createMarker } from './map.js';
import { getData } from './api.js';
import { showMessage, setOfferFormSubmit } from './forms.js';

const MAX_SIMILAR_OFFERS = 10;

getData((offers) => {
  offers.slice(0, MAX_SIMILAR_OFFERS).forEach((offer) => {
    createMarker(offer.location, createOfferPopup(offer));
  });
}, showMessage);

setOfferFormSubmit(() => {});
