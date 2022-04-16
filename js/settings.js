const MAX_SIMILAR_OFFERS = 10;

const TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const MAX_PRICE = 100000;

const DEFAULT_LOCATION = {
  lat: 35.6895,
  lng: 139.69171,
};

const PRICE_FILTER = {
  'low': (n) => n < 10000,
  'middle': (n) => n >= 1000 && n < 50000,
  'high': (n) => n >= 50000
};

const MARKERS_RERENDER_DELAY = 5000;

export { MAX_SIMILAR_OFFERS, TYPES, PRICES, MAX_PRICE, DEFAULT_LOCATION, PRICE_FILTER, MARKERS_RERENDER_DELAY };
