import { PRICES } from './settings.js';
import { setSliderState } from './slider.js';
import './validation.js';

const ALERT_SHOW_TIME = 5000;

const FORM_CLASS_NAMES = ['ad-form', 'map__filters'];

const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const addressElement = document.querySelector('#address');

/*
  const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
*/

const setStateToAttrDisabled = (element, state) => {
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child.tagName === 'FIELDSET') {
      setStateToAttrDisabled(child, state);
    } else {
      if (state) {
        child.setAttribute('disabled', true);
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

/*
const showMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
}
*/

const showMessage = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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

typeElement.addEventListener('change', onTypeChange);
timeInElement.addEventListener('change', onTimeChange);
timeOutElement.addEventListener('change', onTimeChange);

export {setFormsState, setAddress, showMessage };
