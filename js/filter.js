import { MAX_SIMILAR_OFFERS, PRICE_FILTER } from './settings.js';
import { createMarker, removeMarkers } from './map.js';
import { createOfferPopup } from './offers-markup.js';
import { showMessage } from './forms.js';
import { getData } from './api.js';

const mapFilterForm = document.querySelector('.map__filters');
const filterElements = mapFilterForm.querySelectorAll('.map__filter');
const filterCheckboxElements = mapFilterForm.querySelectorAll('.map__checkbox');

const getFilter = () => {
  const filter = {};
  for (const filterElement of filterElements) {
    if (filterElement.value !== 'any') {
      const key = filterElement.name.slice(8);
      filter[key] = ['type', 'price'].includes(key) ? filterElement.value : parseInt(filterElement.value, 10);
    }
  }
  const features = [];
  for (const filterCheckboxElement of filterCheckboxElements) {
    if (filterCheckboxElement.checked) {
      features.push(filterCheckboxElement.value);
    }
  }
  if (features.length > 0) {
    filter.features = features;
  }
  return filter;
};

const filterOffers = (offers, filter) => offers.filter(({offer}) => {
  let result = true;
  for (const key in filter) {
    if (key === 'price') {
      result = result && PRICE_FILTER[filter[key]](offer.price);
    } else if (key === 'features') {
      for (const filterFeature of filter[key]) {
        if (!Object.hasOwn(offer, 'features') || !offer.features.includes(filterFeature)) {
          return false;
        }
      }
    } else {
      result = result && offer[key] === filter[key];
    }
    if (!result) {
      return false;
    }
  }
  return true;
});

const onFilterChange = () => {
  removeMarkers();
  const currentFilter = getFilter();
  getData((offers) => {
    filterOffers(offers, currentFilter).slice(0, MAX_SIMILAR_OFFERS).forEach((offer) => {
      createMarker(offer.location, createOfferPopup(offer));
    });
  }, showMessage);
};

filterElements.forEach((filterElement) => {
  filterElement.addEventListener('change', onFilterChange);
});

filterCheckboxElements.forEach((filterElement) => {
  filterElement.addEventListener('change', onFilterChange);
});
