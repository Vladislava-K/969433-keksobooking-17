'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var adFormInput = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var adFormFieldset = document.querySelectorAll('.ad-form__element');

  var mapFiltersInput = mapFilters.querySelectorAll('input');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = document.querySelector('#housing-features');

  var mapPinMain = document.querySelector('.map__pin--main');

  var ads = [];

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

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
    mapElement: mapElement,
    adForm: adForm,
    mapFilters: mapFilters,
    adFormInput: adFormInput,
    adFormSelect: adFormSelect,
    adFormFieldset: adFormFieldset,
    mapFiltersInput: mapFiltersInput,
    mapFiltersSelect: mapFiltersSelect,
    mapFiltersFieldset: mapFiltersFieldset,
    mapPinMain: mapPinMain,
    ads: ads,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    shuffle: shuffle,
    randomSelection: randomSelection,
    getRandomInt: getRandomInt,
    arrayStrings: arrayStrings
  };
})();
