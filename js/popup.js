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
  var renderSuccessMessage = function () {
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

    var TypesOfOffers = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var filtersContainerElement = document.querySelector('.map__filters-container');

    // Заполняем шаблон #card
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');//  Итоговую разметку берем из шаблона #card

    var cardElement = similarCardTemplate.cloneNode(true);

    // Проверка полей объявлений (Если данных для заполнения не хватает, соответствующий блок в карточке скрывается)
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
      cardElement.querySelector('.popup__type').textContent = TypesOfOffers[ads.offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }

    if (ads.offer.rooms && ads.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (ads.offer.checkin && ads.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }

    var createFeatureFragment = function (adsFeature) {
      cardElement.querySelector('.popup__features').innerHTML = '';
      var featureFragment = document.createDocumentFragment();

      adsFeature.offer.features.forEach(function (featureName) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + featureName;

        featureFragment.appendChild(featureItem);
      });

      return featureFragment;
    };

    if (ads.offer.features.length > 0) {
      cardElement.querySelector('.popup__features').appendChild(createFeatureFragment(ads));
    } else {
      cardElement.querySelector('.popup__features').remove();
    }

    if (ads.offer.description) {
      cardElement.querySelector('.popup__description').textContent = ads.offer.description;
    } else {
      cardElement.querySelector('.popup__description').remove();
    }

    var createPhotosFragment = function (adsPhotos) {
      cardElement.querySelector('.popup__photos').innerHTML = '';
      var photosFragment = document.createDocumentFragment();

      adsPhotos.offer.photos.forEach(function (srcItem) {
        var popupPhotoItem = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);
        popupPhotoItem.src = srcItem;

        photosFragment.appendChild(popupPhotoItem);
      });

      return photosFragment;
    };

    if (ads.offer.photos.length > 0) {
      cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(ads));
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
    renderSuccessMessage: renderSuccessMessage,
    removeCard: removeCard,
    renderCard: renderCard
  };
})();
