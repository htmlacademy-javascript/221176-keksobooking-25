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

export {TYPES, PRICES, MAX_PRICE, DEFAULT_LOCATION};
