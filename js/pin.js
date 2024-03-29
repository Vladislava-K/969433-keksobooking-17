'use strict';

(function () {
  var LENGTH_ANNOUNCEMENTS_ARR = 8;
  var mainElement = document.querySelector('main');

  //  Функция создания DOM-элементов, соответствующих меткам на карте, и заполнения их данными из массива
  var renderPin = function (pin) {
    // Заполняем шаблон #pin
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');//  Итоговую разметку метки .map__pin берем из шаблона #pin
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = 'Заголовок объявления';

    var onPinClick = function () {
      window.popup.removeCard();

      window.popup.renderCard(pin);
    };

    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  //  Функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fillingPin = function (ads) {
    var similarListPinElement = document.querySelector('.map__pins');//  Аналогичные элементы списка

    var fragment = document.createDocumentFragment();

    var newPins = ads.slice(0, window.filter.PINS_LIMIT);
    newPins.forEach(function (itemAds) {
      fragment.appendChild(renderPin(itemAds));
    });

    similarListPinElement.appendChild(fragment);
  };

  var successHandler = function (data) {
    //  Если в объекте с описанием объявления отсутствует поле offer, то метка объявления не должна отображаться на карте
    window.util.ads = data.filter(function (num) {
      return num.offer;
    });

    window.filter.activate();

    return data.slice(0, window.util.PINS_LIMIT);
  };

  //  Функция удаления меток с карты
  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (itemPin) {
      itemPin.remove();
    });
  };

  window.pin = {
    LENGTH_ANNOUNCEMENTS_ARR: LENGTH_ANNOUNCEMENTS_ARR,
    mainElement: mainElement,
    filling: fillingPin,
    successHandler: successHandler,
    remove: removePins
  };
})();
