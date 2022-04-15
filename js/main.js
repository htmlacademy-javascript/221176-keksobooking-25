import { MAX_SIMILAR_OFFERS } from './settings.js';
import { createMarker } from './map.js';
import { createOfferPopup } from './offers-markup.js';
import { showMessage, setOfferFormSubmit } from './forms.js';
import { getData } from './api.js';
import './filter.js';


getData((offers) => {
  offers.slice(0, MAX_SIMILAR_OFFERS).forEach((offer) => {
    createMarker(offer.location, createOfferPopup(offer));
  });
}, showMessage);

setOfferFormSubmit(() => {});
