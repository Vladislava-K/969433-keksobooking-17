'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormDisable = document.querySelector('.ad-form--disabled');
  var mapFilters = document.querySelector('.map__filters');

  var adFormInput = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var adFormFieldset = document.querySelectorAll('.ad-form__element');

  var adFormFieldsetInput = document.querySelector('.features').querySelectorAll('input');
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
  var getRandomSelection = function (arr) {
    var randomValue = Math.floor(Math.random() * arr.length);
    return randomValue;
  };

  // Возвращает случайное целое число между min и max
  var getRandomInt = function (min, max) {
    var randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  };

  // Создает массив строк (начало строки + 0 + число от min до max + конец строки)
  var getArrayStrings = function (string1, string2, min, max) {
    var myStrings = [];
    var temp = min;

    for (var i = 0; i <= (max - min); i++) {
      myStrings[i] = string1 + '0' + temp + string2;
      temp = temp + 1;
    }

    return myStrings;
  };

  var activateFields = function (fields) {
    fields.forEach(function (item) {
      item.disabled = false;
    });
  };

  var deactivateFields = function (fields) {
    fields.forEach(function (item) {
      item.disabled = true;
    });
  };

  var activateFeatures = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();

      var input = evt.target;
      if (input.checked) {
        input.checked = false;
      } else {
        input.checked = true;
      }
    }
  };

  window.util = {
    mapElement: mapElement,
    adForm: adForm,
    adFormDisable: adFormDisable,
    mapFilters: mapFilters,
    adFormInput: adFormInput,
    adFormSelect: adFormSelect,
    adFormFieldset: adFormFieldset,
    adFormFieldsetInput: adFormFieldsetInput,
    mapFiltersInput: mapFiltersInput,
    mapFiltersSelect: mapFiltersSelect,
    mapFiltersFieldset: mapFiltersFieldset,
    mapPinMain: mapPinMain,
    ads: ads,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    shuffle: shuffle,
    getRandomSelection: getRandomSelection,
    getRandomInt: getRandomInt,
    getArrayStrings: getArrayStrings,
    activateFields: activateFields,
    deactivateFields: deactivateFields,
    activateFeatures: activateFeatures
  };
})();
