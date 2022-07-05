import { sendData } from './api.js';
import { resetMap } from './map.js';
import { resetSlider } from './slider.js';
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.childNodes;
// const adFormTitle = adForm.querySelector('#title');
const adFormAddress = adForm.querySelector('#address');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormReset = adForm.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.childNodes;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
// const buttonSubmit = adForm.querySelector('.ad-form__submit');
const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.disabled= true;
  });
};
disableForms();
// const regExp = /^[0-9]+$/;
const unDisableForms = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = false;
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.disabled= false;
  });
};

const setAddress = ({lat, lng}) => {
  adFormAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

// eslint-disable-next-line no-unused-vars
const MIN_PRICE_SETTINGS = {
  bungalow: 0,
  flat: 1000,
  hotel: 0,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text--pristine'
});

// const disableForms = () => {
//   adForm.classList.add('ad-form--disabled');
//   adFormElements.forEach((element) => {
//     element.disabled = true;
//   });
//   mapFilters.classList.add('map__filters--disabled');
//   mapFiltersElements.forEach((element) => {
//     element.disabled= true;
//   });
// };
// disableForms();


pristine.addValidator(adFormPrice, (value) => {
  if (value > 1000000) {
    return false;
  }
  return true;
}, 'Максимальная цена - 1 000 000 руб');

adFormPrice.addEventListener('input', () => {
  adFormPrice.value = adFormPrice.value.trim();
});


const adFormMinPrice = (input) => {
  const minPrice = eval(`MIN_PRICE_SETTINGS.${input.value}`);
  adFormPrice.placeholder = minPrice;
  // const checkMinPrice = () => {
  //   if (adFormPrice.value < minPrice) {
  //     const errorText = document.createElement('div');
  //     errorText.classList.add('ad-form__error-text');
  //     errorText.textContent = `Минимальная цена - ${minPrice}`;
  //     adFormPrice.insertAdjacentElement('afterend', errorText);
  //     return false;
  //   }
  //   return true;
  // };
  // adFormPrice.removeEventListener('input', checkMinPrice);
  // adFormPrice.addEventListener('input', checkMinPrice);
  // adFormPrice.min = minPrice;
  // adFormPrice.dataset.pristineMinMessage = `Минимальная цена - ${minPrice}`;
  // adFormPrice.addEventListener('input', () => {
  //   pristine.validate(adFormPrice);
  // });
  // const checkMinPrice = () => {
  //   pristine.addValidator(adFormPrice, (value) => {
  //     if (value < minPrice) {
  //       return false;
  //     }
  //     return true;
  //   }, `Минимальная цена - ${minPrice}`);
  // };
  // adFormPrice.addEventListener('input', checkMinPrice);
};

adFormMinPrice(adFormType);

adFormType.addEventListener('change', (evt) => {
  adFormMinPrice(evt.target);
});


const closeSuccessMessage = () =>{
  successMessage.remove();
  document.body.removeEventListener('click', closeSuccessMessage);
  document.body.removeEventListener('keydown', escCloseSuccessMessage);
  resetMap();
  resetSlider();
};

const closeErrorMessage = () =>{
  errorMessage.remove();
  document.body.removeEventListener('click', closeErrorMessage);
  document.body.removeEventListener('keydown', escCloseErrorMessage);
};

function escCloseSuccessMessage(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function escCloseErrorMessage(evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}

const showSuccessMessage = () => {
  document.body.querySelector('main').append(successMessage);
  adForm.reset();
  document.body.addEventListener('click', closeSuccessMessage);
  document.body.addEventListener('keydown', escCloseSuccessMessage);
};

const showErrorMessage = () => {
  document.body.querySelector('main').append(errorMessage);
  document.body.addEventListener('click', closeErrorMessage);
  document.body.addEventListener('keydown', escCloseErrorMessage);
};

adFormReset.addEventListener('click', () => {
  resetMap();
  resetSlider();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  let isValid = pristine.validate();
  const minPrice = eval(`MIN_PRICE_SETTINGS.${adFormType.value}`);
  if (adFormPrice.value < minPrice && adFormPrice.value) {
    if (document.querySelector('#price ~ .ad-form__error-text') === null) {
      const errorText = document.createElement('div');
      errorText.classList.add('ad-form__error-text');
      adFormPrice.insertAdjacentElement('afterend', errorText);
      isValid = false;
    }
    document.querySelector('#price ~ .ad-form__error-text').textContent = `Минимальная цена - ${minPrice}`;
    adFormPrice.style.border = '2px solid red';
  } else if (document.querySelector('#price ~ .ad-form__error-text') !== null){
    document.querySelector('#price ~ .ad-form__error-text').remove();
    adFormPrice.style = '';
    isValid = true;
  }
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(showSuccessMessage, showErrorMessage, formData);
  }
});


export {unDisableForms, setAddress};
