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

const sendData = (onSuccsess, onFail, body) => {
  fetch (
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body
    },
  )
    .then((responce) => {
      if(responce.ok) {
        onSuccsess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
