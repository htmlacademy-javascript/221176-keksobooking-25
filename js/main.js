import { createMarker } from './map.js';
import { makeOffersArray } from './data.js';
import { createOfferPopup } from './offers-markup.js';

const offers = makeOffersArray(10);

offers.forEach((offer) => {
  createMarker(offer.location, createOfferPopup(offer));
});
