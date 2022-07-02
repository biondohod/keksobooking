const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const mapCanvasFragment = document.createDocumentFragment();

const renderOffers = (offersData) => {
  const newCard = cardTemplate.cloneNode(true);

  const newCardTitle = newCard.querySelector('.popup__title');
  newCardTitle.textContent = offersData[0].offer.title;

  const newCardAddress = newCard.querySelector('.popup__text--address');
  newCardAddress.textContent = offersData[0].offer.address;

  const newCardPrice = newCard.querySelector('.popup__text--price');
  newCardPrice.insertAdjacentHTML('afterbegin', offersData[0].offer.price);

  const newCardType = newCard.querySelector('.popup__type');
  if (offersData[0].offer.type === 'flat') {
    newCardType.textContent = 'Квартира';
  } else if (offersData[0].offer.type === 'bungalow') {
    newCardType.textContent = 'Бунгало';
  } else if (offersData[0].offer.type === 'house') {
    newCardType.textContent = 'Дом';
  } else if (offersData[0].offer.type === 'palace') {
    newCardType.textContent = 'Дворец';
  } else if (offersData[0].offer.type === 'hotel') {
    newCardType.textContent = 'Отель';
  }

  const newCardGuests = offersData[0].offer.guests;
  const newCardRooms = offersData[0].offer.rooms;
  const newCardCapacity = newCard.querySelector('.popup__text--capacity');
  if (newCardGuests !== '' && newCardRooms !== '') {
    newCardCapacity.textContent = `${newCardRooms} комнаты для ${newCardGuests} гостей`;
  } else {
    newCardCapacity.classList.add('hidden');
  }

  const newCardCheckin = offersData[0].offer.checkin;
  const newCardCheckout = offersData[0].offer.checkout;
  const newCardTime = newCard.querySelector('.popup__text--time');
  if (newCardCheckin !== '' && newCardCheckout !== '') {
    newCardTime.textContent = `Заезд после ${newCardCheckin}, выезд до ${newCardCheckout}`;
  } else {
    newCardTime.classList.add('hidden');
  }

  const newCardFeaturesList = newCard.querySelector('.popup__features');
  newCardFeaturesList.innerHTML = '';
  const newCardFeatures = offersData[0].offer.features;

  if (newCardFeatures.length > 0) {
    newCardFeatures.forEach((feature) => {
      const newFeature = document.createElement('li');
      newFeature.classList.add('.popup__feature');
      newFeature.classList.add(`.popup__feature--${feature}`);
      newCardFeaturesList.append(newFeature);
    });
  } else {
    newCardFeaturesList.classList.add('hidden');
  }

  const newCardDescription = newCard.querySelector('.popup__description');
  if (offersData[0].offer.description !== '') {
    newCardDescription.textContent = offersData[0].offer.description;
  } else {
    newCardDescription.classList.add('hidden');
  }

  const newCardPhotosList = newCard.querySelector('.popup__photos');
  const newCardPhoto = newCardPhotosList.querySelector('.popup__photo');
  newCardPhotosList.innerHTML = '';
  const newCardPhotos = offersData[0].offer.photos;

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
  if (offersData[0].author.avatar !== '') {
    newCardAvatar.src = offersData[0].author.avatar;
  } else {
    newCardAvatar.classList.add('hidden');
  }

  mapCanvasFragment.append(newCard);

  mapCanvas.append(mapCanvasFragment);
};

// console.log(data);
// renderOffers(data);

export {renderOffers};
