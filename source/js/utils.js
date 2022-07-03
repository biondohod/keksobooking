const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.style.position = 'fixed';
  alert.style.zIndex = 100;
  alert.style.top = 0;
  alert.style.left = 0;
  alert.style.right = 0;
  alert.style.padding = '20px';
  alert.style.textAlign = 'center';
  alert.style.color = 'white';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};
