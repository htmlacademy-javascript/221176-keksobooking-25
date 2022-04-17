import { DEFAULT_LOCATION, MAX_SIMILAR_OFFERS, MAIN_FORM_CLASS_NAME, FILTER_FORM_CLASS_NAME } from './const.js';
import { initMap, createMarker } from './map.js';
import { createOfferPopup } from './offers-markup.js';
import { setFormsState, setFormState, setAddress, showMessage, setOfferFormSubmit } from './forms.js';
import { getData } from './api.js';
import './filter.js';
import './images.js';

setFormsState(false);

initMap(() => {
  setFormState(MAIN_FORM_CLASS_NAME, true);
  setAddress(DEFAULT_LOCATION);
  getData((offers) => {
    offers.slice(0, MAX_SIMILAR_OFFERS).forEach((offer) => {
      createMarker(offer.location, createOfferPopup(offer));
    });
    setFormState(FILTER_FORM_CLASS_NAME, true);
  }, showMessage);
});

setOfferFormSubmit(() => {});
