import { data } from './api.js';
import { debounce } from './utils.js';
import { renderOffers } from './render-offers.js';
const RENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');
const type = mapFilters.querySelector('#housing-type');
const price = mapFilters.querySelector('#housing-price');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');
const checkboxList = mapFilters.querySelectorAll('.map__checkbox');

const applyFilter = () => {
  const offersFilters = data.slice();

  if (type.value !== 'any') {
    for (let i=0; i<offersFilters.length; i++) {
      if (offersFilters[i].offer.type !== type.value) {
        delete offersFilters[i];
      }
    }
  }

  if (price.value !== 'any') {
    if (price.value === 'middle') {
      for (let i = 0; i < offersFilters.length; i++) {
        if (offersFilters[i]) {
          if (offersFilters[i].offer.price > 50000 || offersFilters[i].offer.price < 10000) {
            delete offersFilters[i];
          }
        }
      }
    } else if (price.value === 'low') {
      for (let i = 0; i < offersFilters.length; i++) {
        if (offersFilters[i]) {
          if (offersFilters[i].offer.price > 10000) {
            delete offersFilters[i];
          }
        }
      }
    } else if (price.value === 'high') {
      for (let i = 0; i < offersFilters.length; i++) {
        if (offersFilters[i]) {
          if (offersFilters[i].offer.price < 50000) {
            delete offersFilters[i];
          }
        }
      }
    }
  }

  if (rooms.value !== 'any') {
    for (let i = 0; i < offersFilters.length; i++) {
      if (offersFilters[i]) {
        if (offersFilters[i].offer.rooms !== parseInt(rooms.value, 10)) {
          delete offersFilters[i];
        }
      }
    }
  }

  if (guests.value !== 'any') {
    for (let i = 0; i < offersFilters.length; i++) {
      if (offersFilters[i]) {
        if (offersFilters[i].offer.guests !== parseInt(guests.value, 10)) {
          delete offersFilters[i];
        }
      }
    }
  }

  checkboxList.forEach((checkbox) => {
    if (checkbox.checked) {
      for (let i = 0; i < offersFilters.length; i++) {
        if (offersFilters[i]) {
          if (!offersFilters[i].offer.features.includes(checkbox.value)) {
            delete offersFilters[i];
          }
        }
      }
    }
  });

  return offersFilters;
};

const renderFilters = debounce(
  () => renderOffers(applyFilter()),
  RENDER_DELAY
);


mapFilters.addEventListener('change', renderFilters);

mapFilters.addEventListener('reset', () => {
  renderOffers(data);
});
