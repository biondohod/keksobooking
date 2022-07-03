const getData = (onSuccsess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offerData) => {
      onSuccsess(offerData);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные с сервера. Попробуйте обновить страницу или проверьте соединение с интернетом');
    });
};

export {getData};
