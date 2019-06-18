'use strict';

var LENGTH_ANNOUNCEMENTS_ARR = 8;
var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X_MIN = 0;
var LOCATION_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var randomSelection = function (arr) {
  var rands = Math.floor(Math.random() * arr.length);
  return (rands);
};// Выбирает случайное значение из массива

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
};// Перемешивает массив используя тасование Фишера-Йетса

var getRandomArbitary = function (min, max) {
  var rand = Math.random() * (max - min) + min;
  return rand;
};// Возвращает случайное число между min и max

var getRandomInt = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
};// Возвращает случайное целое число между min и max

var arrayStrings = function (string1, string2, min, max) {
  var myStrings = [];
  var temp = min;

  for (var i = 0; i <= (max - min); i++) {
    myStrings[i] = string1 + '0' + temp + string2;
    temp = temp + 1;
  }

  return (myStrings);
};// Создает массив строк

var arrMyAnnouncements = function (avatarArr, arrType, minX, maxX, minY, maxY, arrLength) {
  var location = [];
  var announcements = [];
  for (var i = 0; i < arrLength; i++) {
    var shuffleType = shuffle(arrType);
    var chosenType = randomSelection(shuffleType);
    var locationX = getRandomInt(minX, maxX);
    var locationY = getRandomArbitary(minY, maxY);
    location[i] = {x: locationX, y: locationY};
    announcements[i] = {author: avatarArr[i], offer: chosenType, location: location[i]};
  }

  return (announcements);
};// Создает массив объявлений из объектов с данными

var arrayAvatar = arrayStrings('img/avatars/user', '.png', 1, LENGTH_ANNOUNCEMENTS_ARR);
var arrayAnnouncements = arrMyAnnouncements(arrayAvatar, TYPE_ARR, LOCATION_X_MIN, LOCATION_WIDTH, LOCATION_Y_MIN, LOCATION_Y_MAX, LENGTH_ANNOUNCEMENTS_ARR);

document.querySelector('.map').classList.remove('.map--faded');

var similarListElement = document.querySelector('.map__pins');//  Аналогичные элементы списка
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');//  Итоговую разметку метки .map__pin берем из шаблона #pin

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
  pinElement.querySelector('.map__pin').querySelector('img').src = pin.author;
  pinElement.querySelector('.map__pin').querySelector('img').alt = 'Заголовок объявления';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < arrayAnnouncements.length; i++) {
  fragment.appendChild(renderPin(arrayAnnouncements[i]));
}
similarListElement.appendChild(fragment);
