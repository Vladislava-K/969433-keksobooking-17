'use strict';

(function () {
  //  Задание 21: надо подкачаться. Часть 2. Рабочая ветка module8-task4
  //  Обработчик ошибок сети
  var renderErrorMessage = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');//  Итоговую разметку .error берем из шаблона #error

    var errorElement = similarErrorTemplate.cloneNode(true);
    window.pin.mainElement.appendChild(errorElement);

    var message = document.createElement('p');
    message.classList.add('error__message');
    message.textContent = errorMessage;

    document.querySelector('.error').appendChild(message);
    document.querySelector('.error').querySelector('p').insertAdjacentElement('afterBegin', message);

    var onErrorEscDown = function (evt) {
      window.util.isEscEvent(evt, closeErrorMessage);
    };

    var onErrorClick = function () {
      closeErrorMessage();
    };

    var closeErrorMessage = function () {
      errorElement.classList.add('hidden');

      document.removeEventListener('keydown', onErrorEscDown);
      errorElement.removeEventListener('click', onErrorClick);
    };

    document.addEventListener('keydown', onErrorEscDown);
    errorElement.addEventListener('click', onErrorClick);
  };

  //  Сообщение об успешной отправке формы
  var renderPopupSuccess = function () {
    var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');//  Итоговую разметку .succes берем из шаблона #succes

    var successElement = similarSuccessTemplate.cloneNode(true);
    window.pin.mainElement.appendChild(successElement);

    var onSuccessEscDown = function (evt) {
      window.util.isEscEvent(evt, closeSuccessMessage);
    };

    var onSuccessClick = function () {
      closeSuccessMessage();
    };

    var closeSuccessMessage = function () {
      successElement.classList.add('hidden');

      document.removeEventListener('keydown', onSuccessEscDown);
      successElement.removeEventListener('click', onSuccessClick);
    };

    document.addEventListener('keydown', onSuccessEscDown);
    successElement.addEventListener('click', onSuccessClick);
  };

  window.popup = {
    renderErrorMessage: renderErrorMessage,
    renderPopupSuccess: renderPopupSuccess
  };
})();
