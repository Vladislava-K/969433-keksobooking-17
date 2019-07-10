'use strict';

(function () {
  var ServerUrl = {
    URL_POST: 'https://js.dump.academy/keksobooking',
    URL_GET: 'https://js.dump.academy/keksobooking/data'
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();//  Вызываем функцию-конструктор
    xhr.responseType = 'json';//  Изменяем тип ответа на json
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);// Возвращает объект когда загружается вся страница
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText + ' Пожалуйста, обновите страницу.');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Пожалуйста, обновите страницу.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Пожалуйста, обновите страницу.');
    });
    xhr.timeout = 10000;// Определяет количество миллисекунд, которое запрос будет выполняться, до того, как будет автоматически прерван (10с)
    return xhr;
  };

  // функция, которая отправляет данные на сервер
  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('POST', ServerUrl.URL_POST);// Открываем соединение
    xhr.send(data);// Отправляем данные
  };

  // функция, которая получает данные с сервера
  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('GET', ServerUrl.URL_GET);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
