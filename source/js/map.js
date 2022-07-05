import {setAddress, unDisableForms } from './form.js';
const map = L.map('map-canvas')
  .on('load', unDisableForms)
  .setView({
    lat: 35.6895000,
    lng: 139.6917100
  },10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const mainpinIcon = L.icon ({
  iconUrl: './img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52]
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100
  },
  {
    draggable: true,
    icon: mainpinIcon
  }
);

mainPinMarker.addTo(map);
setAddress(mainPinMarker.getLatLng());
mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const offerpinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52]
});

const markerGroup = L.layerGroup().addTo(map);
const renderOfferPinMarker = (offerData, newCard) => {
  const lat = offerData.location.lat;
  const lng = offerData.location.lng;
  const offerPinMarker = L.marker(
    {
      lat: lat,
      lng: lng
    },
    {
      icon: offerpinIcon
    }
  );
  offerPinMarker
    .addTo(markerGroup)
    .bindPopup(newCard);
};

const resetMap = () => {
  map.setView({
    lat: 35.6895000,
    lng: 139.6917100
  },10);
  mainPinMarker.setLatLng({
    lat: 35.6895000,
    lng: 139.6917100
  });
  setAddress(mainPinMarker.getLatLng());
};

export {renderOfferPinMarker, resetMap};
