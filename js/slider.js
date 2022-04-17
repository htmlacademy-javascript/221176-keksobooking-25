import { PRICES, MAX_PRICE } from './const.js';

const SLIDER_DEFAULT_SETTINGS = {
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const PRICES_SETTINGS = {
  bungalow: {
    min: PRICES['bungalow'],
    max: MAX_PRICE
  },
  flat: {
    min: PRICES['flat'],
    max: MAX_PRICE
  },
  hotel: {
    min: PRICES['hotel'],
    max: MAX_PRICE
  },
  house: {
    min: PRICES['house'],
    max: MAX_PRICE
  },
  palace: {
    min: PRICES['palace'],
    max: MAX_PRICE
  }
};

const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');

const setSliderState = (state) => {
  if (state) {
    sliderElement.removeAttribute('disabled');
  } else {
    sliderElement.setAttribute('disabled', true);
  }
};

noUiSlider.create(sliderElement, Object.assign(SLIDER_DEFAULT_SETTINGS, {
  range: PRICES_SETTINGS['flat'],
  start: PRICES['flat'],
}));

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

typeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions(Object.assign(SLIDER_DEFAULT_SETTINGS, {
    range: PRICES_SETTINGS[typeElement.value],
    start: PRICES[typeElement.value],
  }));
});

export {setSliderState};
