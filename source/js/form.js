const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.childNodes;
// const adFormTitle = adForm.querySelector('#title');
// const adFormAddress = adForm.querySelector('#address');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.childNodes;
// const buttonSubmit = adForm.querySelector('.ad-form__submit');

// const regExp = /^[0-9]+$/;

const MIN_PRICE_SETTINGS = {
  bungalow: 0,
  flat: 1000,
  hotel: 3500,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text--pristine'
});

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  const minPrice = eval(`MIN_PRICE_SETTINGS.${adFormType.value}`);
  if (adFormPrice.value < minPrice ) {
    if (document.querySelector('#price ~ .ad-form__error-text') === null) {
      const errorText = document.createElement('div');
      errorText.classList.add('ad-form__error-text');
      adFormPrice.insertAdjacentElement('afterend', errorText);
    }
    document.querySelector('#price ~ .ad-form__error-text').textContent = `Минимальная цена - ${minPrice}`;
  } else if (document.querySelector('#price ~ .ad-form__error-text') !== null){
    document.querySelector('#price ~ .ad-form__error-text').remove();
  }
});

