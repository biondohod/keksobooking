const adForm = document.querySelector('.ad-form');
const avatarUpload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photosUpload = document.querySelector('#images');
const photosPreview = document.querySelector('.ad-form__photo');
avatarUpload.addEventListener('change', () => {
  const avatar = avatarUpload.files[0];
  avatarPreview.src = URL.createObjectURL(avatar);
});
photosUpload.addEventListener('change', () => {
  photosPreview.innerHTML = '';
  const images = photosUpload.files;
  const photo = document.createElement('img');
  photo.src = URL.createObjectURL(images[0]);
  photo.style.width = '100%';
  photosPreview.append(photo);
});

adForm.addEventListener('reset', () => {
  photosPreview.innerHTML = '';
  photosUpload.value = '';
  avatarPreview.src = 'img/muffin-grey.svg';
  avatarUpload.value = '';
});
