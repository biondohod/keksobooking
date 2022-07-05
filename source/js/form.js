import { sendData} from './api.js';
import { resetMap } from './map.js';
import { resetSlider } from './slider.js';
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.childNodes;
const adFormAddress = adForm.querySelector('#address');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormReset = adForm.querySelector('.ad-form__reset');
const adFormTimein = adForm.querySelector('#timein');
const adFormTimeout = adForm.querySelector('#timeout');
const adFormRooms = adForm.querySelector('#room_number');
const adFormGuests = adForm.querySelector('#capacity');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.childNodes;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

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
};

adFormMinPrice(adFormType);

adFormType.addEventListener('change', (evt) => {
  adFormMinPrice(evt.target);
});

adFormTimein.addEventListener('change', (evt)=> {
  adFormTimeout.value = evt.target.value;
});

adFormTimeout.addEventListener('change', (evt)=> {
  adFormTimein.value = evt.target.value;
});

const setRoomsGuests = () => {
  if (parseInt(adFormRooms.value, 10) !== 100) {
    for (let i = 0; i < adFormGuests.length; i++) {
      if (adFormGuests[i].value > adFormRooms.value) {
        adFormGuests[i].style = 'display: none';
      } else if (adFormGuests[i].value === adFormRooms.value ){
        adFormGuests[i].selected = true;
        adFormGuests[i].style = '';
      }
      else {
        adFormGuests[i].style = '';
      }
    }
    adFormGuests.querySelector('[value="0"]').style = 'display: none';
  } else {
    for (let i = 0; i < adFormGuests.length; i++) {
      adFormGuests[i].style = 'display: none';
    }
    adFormGuests.querySelector('[value="0"]').style = 'display: none';
    adFormGuests.querySelector('[value="0"]').selected = true;
  }
};
setRoomsGuests();
adFormRooms.addEventListener('change', setRoomsGuests);

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
  mapFilters.reset();
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
