const FORM_CLASS_NAMES = ['ad-form', 'map__filters'];

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
};

const setFormsState = (state) => {
  FORM_CLASS_NAMES.forEach((formClassName) => {
    setStateToForm(`.${formClassName}`, state);
  });
};

export {setFormsState};

