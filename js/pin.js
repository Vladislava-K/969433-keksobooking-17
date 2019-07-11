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

    return pinElement;
  };

  //  Функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fillingPin = function (ads) {
    var similarListPinElement = document.querySelector('.map__pins');//  Аналогичные элементы списка

    var fragment = document.createDocumentFragment();

    var newPins = ads.slice(0, LENGTH_ANNOUNCEMENTS_ARR);
    newPins.forEach(function (itemAds) {
      fragment.appendChild(renderPin(itemAds));
    });

    similarListPinElement.appendChild(fragment);
  };

  //  Функция удаления меток с карты
  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (itemPin) {
      itemPin.remove();
    });
  };

  window.pin = {
    mainElement: mainElement,
    fillingPin: fillingPin,
    removePins: removePins
  };
})();