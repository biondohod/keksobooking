const sliderElement = document.querySelector('.ad-form__slider');
const adFormPrice = document.querySelector('#price');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1000000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed();
    },
    from: function(value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  adFormPrice.value = sliderElement.noUiSlider.get();
});


adFormPrice.addEventListener('input', (evt) => {
  const val = evt.target.value;
  sliderElement.noUiSlider.set(evt.target.value);
  evt.target.value = val;
});

const resetSlider = () => {
  sliderElement.noUiSlider.set(0);
};

export {resetSlider};
