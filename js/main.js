import { makeOffersArray } from './data.js';
import { renderOffers } from './offers-markup.js';

const offers = makeOffersArray(1);
renderOffers(offers);
