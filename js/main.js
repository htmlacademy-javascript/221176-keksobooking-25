import { makeOffersArray } from './data.js';
import { renderOffer } from './offers-markup.js';

const offers = makeOffersArray(1);
renderOffer(offers[0]);
