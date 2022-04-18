import { MAX_SIMILAR_OFFERS, PRICES, ALERT_SHOW_TIME, MAIN_FORM_CLASS_NAME, FILTER_FORM_CLASS_NAME } from './const.js';
import { setSliderState } from './slider.js';
import { sendData } from './api.js';
import { pristine } from './validation.js';
import { isEscapeKey } from './util.js';
import { resetMap, createMarker } from './map.js';
import { resetFilter } from './filter.js';
import { resetImages } from './images.js';
import { getData } from './api.js';
import { createOfferPopup } from './offers-markup.js';

const FORM_CLASS_NAMES = [MAIN_FORM_CLASS_NAME, FILTER_FORM_CLASS_NAME];

const offerForm = document.querySelector('.ad-form');

const titleElement = offerForm.querySelector('#title');
const typeElement = offerForm.querySelector('#type');
const priceElement = offerForm.querySelector('#price');
const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');
const addressElement = offerForm.querySelector('#address');
const roomNumberElement = offerForm.querySelector('#room_number');
const capacityElement = offerForm.querySelector('#capacity');
const descriptionElemnt = offerForm.querySelector('#description');
const featuresElements = offerForm.querySelectorAll('[name="feature"]');

const submitButton = offerForm.querySelector('.ad-form__submit');
const resetButton = offerForm.querySelector('.ad-form__reset');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

let message;

const setStateToAttrDisabled = (element, state) => {
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === 'FIELDSET') {
      setStateToAttrDisabled(child, state);
    } else {
      if (state) {
        child.setAttribute('disabled', 'disabled');
      } else {
        child.removeAttribute('disabled');
      }
    }
  }
};

const setStateToForm = (formClassName, state) => {
  const form = document.querySelector(formClassName);
  if (state) {
    form.classList.remove('ad-form--disabled');
  } else {
    form.classList.add('ad-form--disabled');
  }
  setStateToAttrDisabled(form, !state);
  setSliderState(state);
};

const setFormsState = (state) => {
  FORM_CLASS_NAMES.forEach((formClassName) => {
    setStateToForm(`.${formClassName}`, state);
  });
};

const setFormState = (formClassName, state) => setStateToForm(`.${formClassName}`, state);

const onTypeChange = () => {
  priceElement.placeholder = PRICES[typeElement.value];
};

const syncTime = (source, dest) => {
  dest.value = source.value;
};

const onTimeChange = (evt) => {
  if (evt.target.id === 'timein') {
    syncTime(timeInElement, timeOutElement);
  } else {
    syncTime(timeOutElement, timeInElement);
  }
};

const setAddress = (location) => {
  addressElement.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
};

const showMessage = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка загрузки похожих объявления';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const resetOfferForm = () => {
  titleElement.value = '';
  typeElement.value = 'flat';
  priceElement.value = 1000;
  timeInElement.value = '12:00';
  timeOutElement.value = '12:00';
  roomNumberElement.value = '1';
  capacityElement.value = '3';
  descriptionElemnt.value = '';
  featuresElements.forEach((featureElement) => {
    featureElement.checked = false;
  });
  resetImages();
};

const resetForms = () => {
  resetOfferForm();
  resetFilter();
  setFormState(FILTER_FORM_CLASS_NAME, false);
  resetMap(() => {
    getData((offers) => {
      offers.slice(0, MAX_SIMILAR_OFFERS).forEach((offer) => {
        createMarker(offer.location, createOfferPopup(offer));
      });
      setFormState(FILTER_FORM_CLASS_NAME, true);
    }, showMessage);
  });
};

const closeMessage = () => {
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onMessageEscKeydown);
  message.remove();
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageClick = () => {
  closeMessage();
};

const showSendingResultMessage = (template) => {
  message = template.cloneNode(true);
  message.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.body.append(message);
};

typeElement.addEventListener('change', onTypeChange);
timeInElement.addEventListener('change', onTimeChange);
timeOutElement.addEventListener('change', onTimeChange);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOfferFormSubmit = (onSuccess) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSendingResultMessage(successMessageTemplate);
          unblockSubmitButton();
          resetForms();
        },
        () => {
          showSendingResultMessage(errorMessageTemplate);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { setFormsState, setFormState, setAddress, showMessage, setOfferFormSubmit };
