import { renderOfferPinMarker, clearPinMarkers } from './map.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const MAX_PIN_MARKERS = 10;
const renderOffers = (offersData) => {
  clearPinMarkers();
  let counter = 0;
  offersData.forEach((offerData) => {
    const newCard = cardTemplate.cloneNode(true);

    const newCardTitle = newCard.querySelector('.popup__title');
    newCardTitle.textContent = offerData.offer.title;

    const newCardAddress = newCard.querySelector('.popup__text--address');
    newCardAddress.textContent = offerData.offer.address;

    const newCardPrice = newCard.querySelector('.popup__text--price');
    newCardPrice.insertAdjacentHTML('afterbegin', offerData.offer.price);

    const newCardType = newCard.querySelector('.popup__type');
    if (offerData.offer.type === 'flat') {
      newCardType.textContent = 'Квартира';
    } else if (offerData.offer.type === 'bungalow') {
      newCardType.textContent = 'Бунгало';
    } else if (offerData.offer.type === 'house') {
      newCardType.textContent = 'Дом';
    } else if (offerData.offer.type === 'palace') {
      newCardType.textContent = 'Дворец';
    } else if (offerData.offer.type === 'hotel') {
      newCardType.textContent = 'Отель';
    }

    const newCardGuests = offerData.offer.guests;
    const newCardRooms = offerData.offer.rooms;
    const newCardCapacity = newCard.querySelector('.popup__text--capacity');
    if (newCardGuests !== '' && newCardRooms !== '') {
      newCardCapacity.textContent = `${newCardRooms} комнаты для ${newCardGuests} гостей`;
    } else {
      newCardCapacity.classList.add('hidden');
    }

    const newCardCheckin = offerData.offer.checkin;
    const newCardCheckout = offerData.offer.checkout;
    const newCardTime = newCard.querySelector('.popup__text--time');
    if (newCardCheckin !== '' && newCardCheckout !== '') {
      newCardTime.textContent = `Заезд после ${newCardCheckin}, выезд до ${newCardCheckout}`;
    } else {
      newCardTime.classList.add('hidden');
    }

    const newCardFeaturesList = newCard.querySelector('.popup__features');
    newCardFeaturesList.innerHTML = '';
    const newCardFeatures = offerData.offer.features;

    if (newCardFeatures.length > 0) {
      newCardFeatures.forEach((feature) => {
        const newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature');
        newFeature.classList.add(`popup__feature--${feature}`);
        newCardFeaturesList.append(newFeature);
      });
    } else {
      newCardFeaturesList.classList.add('hidden');
    }

    const newCardDescription = newCard.querySelector('.popup__description');
    if (offerData.offer.description !== '') {
      newCardDescription.textContent = offerData.offer.description;
    } else {
      newCardDescription.classList.add('hidden');
    }

    const newCardPhotosList = newCard.querySelector('.popup__photos');
    const newCardPhoto = newCardPhotosList.querySelector('.popup__photo');
    newCardPhotosList.innerHTML = '';
    const newCardPhotos = offerData.offer.photos;

    if (newCardPhotos.length > 0) {
      newCardPhotos.forEach((photo) => {
        const newPhoto = newCardPhoto.cloneNode(true);
        newPhoto.src = photo;
        newCardPhotosList.append(newPhoto);
      });
    } else {
      newCardPhotosList.classList.add('hidden');
    }

    const newCardAvatar = newCard.querySelector('.popup__avatar');
    if (offerData.author.avatar !== '') {
      newCardAvatar.src = offerData.author.avatar;
    } else {
      newCardAvatar.classList.add('hidden');
    }
    if (counter < MAX_PIN_MARKERS) {
      renderOfferPinMarker(offerData, newCard);
    }
    counter++;
  });
  counter = 0;
};

export {renderOffers};
