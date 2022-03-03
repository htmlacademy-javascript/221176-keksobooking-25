import { getRandomInt, getRandomFloat } from './util.js';

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];

const makeAuthor = () => {
  const userNumber = getRandomInt(1, 10);
  return {
    avatar: `img/avatars/user${(userNumber === 10) ? userNumber : `0${userNumber}`}.png`
  };
};

const makeLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5)
});

const makeOfferInfo = (location) => {
  const offer = {
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInt(5, 100),
    type: TYPES[getRandomInt(0, TYPES.length)],
    rooms: getRandomInt(1, 50),
    guests: getRandomInt(1, 50),
    checkin: TIMES[getRandomInt(0, TIMES.length)],
    checkout: TIMES[getRandomInt(0, TIMES.length)],
    features: [],
    photos: [],
    title: 'Title',
    description: 'Description'
  };

  for (const feature of FEATURES) {
    if (getRandomInt(0, 2) === 1) {
      offer.features.push(feature);
    }
  }
  for (const photo of PHOTOS) {
    if (getRandomInt(0, 2) === 1) {
      offer.photos.push(photo);
    }
  }
  return offer;
};

const makeOffer = () => {
  const location = makeLocation();
  return {
    author: makeAuthor(),
    location: location,
    offer: makeOfferInfo(location)
  };
};

const makeArrayOfOffers = (count) => Array.from({length: count}, makeOffer);

export { makeArrayOfOffers };
