import { PRICES } from './settings.js';
import { setSliderState } from './slider.js';
import './validation.js';

const FORM_CLASS_NAMES = ['ad-form', 'map__filters'];

const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

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

typeElement.addEventListener('change', onTypeChange);
timeInElement.addEventListener('change', onTimeChange);
timeOutElement.addEventListener('change', onTimeChange);

export {setFormsState};
