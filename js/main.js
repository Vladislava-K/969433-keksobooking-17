'use strict';

var LENGTH_ANNOUNCEMENTS_ARR = 8;
var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X_MIN = 0;
var LOCATION_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;
var MAIN_PIN_HEIGTH_AFTER = 22;

var adForm = document.querySelector('.ad-form');
var adFormInput = adForm.querySelectorAll('input');
var adFormSelect = adForm.querySelectorAll('select');

var mapFilters = document.querySelector('.map__filters');
var mapFiltersInput = mapFilters.querySelectorAll('input');
var mapFiltersSelect = mapFilters.querySelectorAll('select');

var mapPinMain = document.querySelector('.map__pin--main');
var mapPin = document.querySelector('.map__pin');

// Перемешивает массив используя тасование Фишера-Йетса
var shuffle = function (arr) {
  var j;
  var temp;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

// Выбирает случайное значение из массива
var randomSelection = function (arr) {
  var rands = Math.floor(Math.random() * arr.length);
  return rands;
};

// Возвращает случайное целое число между min и max
var getRandomInt = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
};

// Создает массив строк (начало строки + 0 + число от min до max + конец строки)
var arrayStrings = function (string1, string2, min, max) {
  var myStrings = [];
  var temp = min;

  for (var i = 0; i <= (max - min); i++) {
    myStrings[i] = string1 + '0' + temp + string2;
    temp = temp + 1;
  }

  return myStrings;
};

// Создает массив объектов авторов объявлений
var authorAvatar = function (arrLength) {
  var author = {};
  var tempArr = arrayStrings('img/avatars/user', '.png', 1, arrLength);
  for (var i = 0; i < arrLength; i++) {
    author[i] = {avatar: tempArr[i]};
  }

  return author;
};

// Создает массив объектов с одним из фиксированных значений типа объявления
var offerType = function (arr, arrLength) {
  var offer = {};
  for (var i = 0; i < arrLength; i++) {
    var shuffleType = shuffle(arr);
    var tempArrI = randomSelection(shuffleType);
    offer[i] = {type: arr[tempArrI]};
  }

  return offer;
};

// Создает массив объектов с координатами метки объявления
var locationType = function (minX, maxX, minY, maxY, arrLength) {
  var location = {};
  for (var i = 0; i < arrLength; i++) {
    var tempArrX = getRandomInt(minX + PIN_WIDTH / 2, maxX - PIN_WIDTH / 2) - PIN_WIDTH / 2;
    var tempArrY = getRandomInt(minY, maxY) - PIN_HEIGTH;
    location[i] = {x: tempArrX, y: tempArrY};
  }

  return location;
};

// Создает массив объявлений из объектов с данными
var arrMyAnnouncements = function (arrLength) {
  var avatarArr = authorAvatar(arrLength);
  var arrType = offerType(TYPE_ARR, arrLength);
  var arrlocation = locationType(LOCATION_X_MIN, LOCATION_WIDTH, LOCATION_Y_MIN, LOCATION_Y_MAX, arrLength);
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

// координаты метки объявления до активации страницы
var initialCoordinatesAddress = function () {
  var address = {};
  var addressX = mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2;
  var addressY = mapPinMain.offsetTop - mapPinMain.offsetHeight / 2;
  address = {x: addressX, y: addressY};
  var addressCoordinates = (address.x + ', ' + address.y);

  adForm.querySelector('#address').setAttribute('value', addressCoordinates);
};

//  Элементы управления формы неактивны в исходном состоянии
var initialState = function () {
  initialCoordinatesAddress();

  document.querySelector('.map').classList.add('map--faded');

  adFormInput.forEach(function (input) {
    input.setAttribute('disabled', 'disabled');
  });

  adFormSelect.forEach(function (select) {
    select.setAttribute('disabled', 'disabled');
  });

  document.querySelector('.map__filters').classList.add('map__filters--disabled');

  mapFiltersInput.forEach(function (input) {
    input.setAttribute('disabled', 'disabled');
  });

  mapFiltersSelect.forEach(function (select) {
    select.setAttribute('disabled', 'disabled');
  });
};

initialState();

//  Перевод страницы Букинга в активный режим
var activeState = function () {
  fillingPin();

  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  adFormInput.forEach(function (input) {
    input.removeAttribute('disabled');
  });

  adFormSelect.forEach(function (select) {
    select.removeAttribute('disabled');
  });

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');

  mapFiltersInput.forEach(function (input) {
    input.removeAttribute('disabled');
  });

  mapFiltersSelect.forEach(function (select) {
    select.removeAttribute('disabled');
  });

  mapPinMain.removeEventListener('click', activeState);
};

mapPinMain.addEventListener('click', activeState);

// координаты метки объявления после активации страницы
var coordinatesAddress = function () {
  var pinImg = mapPinMain.getElementsByTagName('img')[0];
  var address = {};
  var addressX = mapPin.offsetLeft + mapPin.offsetWidth / 2;
  var addressY = mapPin.offsetTop - pinImg.offsetHeight - MAIN_PIN_HEIGTH_AFTER;
  address = {x: addressX, y: addressY};
  var addressCoordinates = (address.x + ', ' + address.y);

  adForm.querySelector('#address').setAttribute('value', addressCoordinates);
};

mapPinMain.addEventListener('mouseup', coordinatesAddress);
