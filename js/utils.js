'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInput = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInput = mapFilters.querySelectorAll('input');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapPinMain = document.querySelector('.map__pin--main');

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

  window.util = {
    adForm: adForm,
    adFormInput: adFormInput,
    adFormSelect: adFormSelect,
    mapFiltersInput: mapFiltersInput,
    mapFiltersSelect: mapFiltersSelect,
    mapPinMain: mapPinMain,
    shuffle: shuffle,
    randomSelection: randomSelection,
    getRandomInt: getRandomInt,
    arrayStrings: arrayStrings
  };
})();
