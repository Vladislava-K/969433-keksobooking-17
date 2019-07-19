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

  // Проверяем, есть ли на странице открытое объявление, удаляем если есть
  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  //  Создаем DOM-элементы объявлений
  var renderCard = function (ads) {

    var typesOfOffers = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var filtersContainerElement = document.querySelector('.map__filters-container');

    // Заполняем шаблон #card
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');//  Итоговую разметку берем из шаблона #card

    var cardElement = similarCardTemplate.cloneNode(true);

    // Проверка полей объявлений
    if (ads.offer.title) {
      cardElement.querySelector('.popup__title').textContent = ads.offer.title;
    } else {
      cardElement.querySelector('.popup__title').remove();
    }

    if (ads.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = ads.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').remove();
    }

    if (ads.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + ' ₽/ночь';
    } else {
      cardElement.querySelector('.popup__text--price').remove();
    }

    if (ads.offer.type) {
      cardElement.querySelector('.popup__type').textContent = typesOfOffers[ads.offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }

    if (ads.offer.capacity) {
      cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (ads.offer.time) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ',' + ' выезд до ' + ads.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }

    if (ads.offer.features) {
      cardElement.querySelector('.popup__features').textContent = ads.offer.features;
    } else {
      cardElement.querySelector('.popup__features').remove();
    }

    if (ads.offer.description) {
      cardElement.querySelector('.popup__description').textContent = ads.offer.description;
    } else {
      cardElement.querySelector('.popup__description').remove();
    }

    if (ads.offer.photos) {
      cardElement.querySelector('.popup__photos').textContent = '';
      for (var f = 0; f < ads.offer.photos.length; f++) {
        cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + ads.offer.photos[f] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      }
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }

    if (ads.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = ads.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').remove();
    }

    window.util.mapElement.insertBefore(cardElement, filtersContainerElement);

    // Закрываем объявление
    var closeCard = function () {
      removeCard();
      document.removeEventListener('keydown', onCardEscDown);
      closeButton.removeEventListener('click', onCardClick);
    };

    // Закрываем объявление по щелчку на крестик
    var closeButton = cardElement.querySelector('.popup__close');
    var onCardClick = function () {
      closeCard();
    };

    closeButton.addEventListener('click', function () {
      closeCard();
    });

    // Закрываем объявление по нажатию на esc
    var onCardEscDown = function (evt) {
      window.util.isEscEvent(evt, closeCard);
    };

    document.addEventListener('keydown', onCardEscDown);

    return cardElement;
  };

  window.popup = {
    renderErrorMessage: renderErrorMessage,
    renderPopupSuccess: renderPopupSuccess,
    removeCard: removeCard,
    renderCard: renderCard
  };
})();
