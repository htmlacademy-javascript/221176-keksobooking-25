import { PRICES, MAX_PRICE } from './const.js';

const offerForm = document.querySelector('.ad-form');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const roomsField = offerForm.querySelector('#room_number');
const guestsField = offerForm.querySelector('#capacity');
const typeField = offerForm.querySelector('#type');
const priceField = offerForm.querySelector('#price');

const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const validateGuests = () => roomsOption[roomsField.value].includes(guestsField.value);

const getGuestsErrorMessage = () => 'Для выбранного количества гостей указанное количество комнат недоступно';

const validatePrice = (value) => value !== '' && PRICES[typeField.value] <= parseInt(value, 10) && parseInt(value, 10) <= MAX_PRICE;

const getPriceErrorMessage = () => {
  if (priceField.value === '') {
    return 'Обязательное поле';
  }
  if (PRICES[typeField.value] > parseInt(priceField.value, 10)) {
    return `Минимальная цена ${PRICES[typeField.value]}`;
  }
  if (parseInt(priceField.value, 10) > MAX_PRICE) {
    return `Максимальная цена ${MAX_PRICE}`;
  }
};

pristine.addValidator(roomsField, validateGuests, getGuestsErrorMessage);
pristine.addValidator(guestsField, validateGuests, getGuestsErrorMessage);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

export { pristine };
