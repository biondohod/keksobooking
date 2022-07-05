import { showAlert } from './utils.js';
import { getData } from './api.js';
import { renderOffers } from './render-offers.js';
import './form.js';
import './map.js';
import './slider.js';
getData(renderOffers, showAlert);


