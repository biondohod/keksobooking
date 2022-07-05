const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.style.position = 'absolute';
  alert.style.zIndex = 100;
  alert.style.top = 0;
  alert.style.left = 0;
  alert.style.right = 0;
  alert.style.padding = '30px 20px';
  alert.style.textAlign = 'center';
  alert.style.color = 'white';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, debounce};
