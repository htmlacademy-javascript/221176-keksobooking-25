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
const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function validateGuests () {
  return roomsOption[roomsField.value].includes(guestsField.value);
}

function getGuestsErrorMessage () {
  return 'Для выбранного количества гостей указанное количество комнат недоступно';
}

pristine.addValidator(roomsField, validateGuests, getGuestsErrorMessage);
pristine.addValidator(guestsField, validateGuests, getGuestsErrorMessage);


offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
