import { makeOffersArray } from './data.js';
import { renderOffer } from './offers-markup.js';
import { setFormsState } from './forms.js';

setFormsState(true);

const offers = makeOffersArray(1);
renderOffer(offers[0]);
