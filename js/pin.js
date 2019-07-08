'use strict';

(function () {
  var LENGTH_ANNOUNCEMENTS_ARR = 8;
  var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;

  // Создает массив объектов авторов объявлений
  var authorAvatar = function (arrLength) {
    var author = {};
    var tempArr = window.util.arrayStrings('img/avatars/user', '.png', 1, arrLength);
    for (var i = 0; i < arrLength; i++) {
      author[i] = {avatar: tempArr[i]};
    }

    return author;
  };

  // Создает массив объектов с одним из фиксированных значений типа объявления
  var offerType = function (arr, arrLength) {
    var offer = {};
    for (var i = 0; i < arrLength; i++) {
      var shuffleType = window.util.shuffle(arr);
      var tempArrI = window.util.randomSelection(shuffleType);
      offer[i] = {type: arr[tempArrI]};
    }

    return offer;
  };

  // Создает массив объектов с координатами метки объявления
  var locationType = function (minX, maxX, minY, maxY, arrLength) {
    var location = {};
    for (var i = 0; i < arrLength; i++) {
      var tempArrX = window.util.getRandomInt(minX + PIN_WIDTH / 2, maxX - PIN_WIDTH / 2) - PIN_WIDTH / 2;
      var tempArrY = window.util.getRandomInt(minY, maxY) - PIN_HEIGTH;
      location[i] = {x: tempArrX, y: tempArrY};
    }

    return location;
  };

  // Создает массив объявлений из объектов с данными
  var arrMyAnnouncements = function (arrLength) {
    var avatarArr = authorAvatar(arrLength);
    var arrType = offerType(TYPE_ARR, arrLength);
    var arrlocation = locationType(window.map.LOCATION_X_MIN, window.map.LOCATION_WIDTH, LOCATION_Y_MIN, LOCATION_Y_MAX, arrLength);
    var announcements = [];
    for (var i = 0; i < arrLength; i++) {
      announcements[i] = {author: avatarArr[i], offer: arrType[i], location: arrlocation[i]};
    }

    return announcements;
  };

  //  функция создания DOM-элемента на основе JS-объекта
  var renderPin = function (pin) {
    document.querySelector('.map').classList.remove('map--faded');

    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');//  Итоговую разметку метки .map__pin берем из шаблона #pin
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = 'Заголовок объявления';

    return pinElement;
  };

  //  функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fillingPin = function () {
    var arrayAnnouncements = arrMyAnnouncements(LENGTH_ANNOUNCEMENTS_ARR);
    var similarListElement = document.querySelector('.map__pins');//  Аналогичные элементы списка
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayAnnouncements.length; i++) {
      fragment.appendChild(renderPin(arrayAnnouncements[i]));
    }

    similarListElement.appendChild(fragment);
  };

  window.pin = {
    fillingPin: fillingPin
  };

})();
