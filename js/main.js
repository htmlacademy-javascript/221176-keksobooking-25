const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min - max >= 0) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomFloat = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0 || min - max >= 0) {
    return null;
  }
  const multiplier = 10 ** digits;
  return Math.floor((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

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
  const offer = {};
  offer.address = `${location.lat}, ${location.lng}`;
  offer.price = getRandomInt(5, 100);
  offer.type = TYPES[getRandomInt(0, TYPES.length)];
  offer.rooms = getRandomInt(1, 50);
  offer.guests = getRandomInt(1, 50);
  offer.checkin = TIMES[getRandomInt(0, TIMES.length)];
  offer.checkout = TIMES[getRandomInt(0, TIMES.length)];
  offer.features = [];
  for (const feature of FEATURES) {
    if (getRandomInt(0, 2) === 1) {
      offer.features.push(feature);
    }
  }
  offer.photos = [];
  for (const photo of PHOTOS) {
    if (getRandomInt(0, 2) === 1) {
      offer.photos.push(photo);
    }
  }
  offer.title = `${offer.type}, ${offer.address}, ${offer.price}`;
  offer.description = `${offer.type}, ${offer.rooms} rooms, ${offer.guests} guests, address: ${offer.address},
  checkin: ${offer.checkin}, checkout: ${offer.checkout}, features: ${offer.features.toString()},
  price: ${offer.price}`;
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

const makeArrayOfOffres = (count) => Array.from({length: count}, makeOffer);

makeArrayOfOffres(10);
