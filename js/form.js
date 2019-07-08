'use strict';

(function () {
  var InitialPlaces = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var roomNumberSelect = window.util.adForm.querySelector('#room_number');
  var capacitySelect = window.util.adForm.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var roomNumber = roomNumberSelect.querySelector('option' + '[selected]').value;

  var housingType = window.util.adForm.querySelector('#type');

  var dataTimeIn = window.util.adForm.querySelector('#timein');
  var dataTimeOut = window.util.adForm.querySelector('#timeout');

  // Выбор минимальной цены по типу жилья
  var typePriceHouseChange = function () {
    var viewPrice = window.util.adForm.querySelector('#price');

    var priceType = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    viewPrice.min = priceType[housingType.value];
    viewPrice.placeholder = priceType[housingType.value];
  };

  housingType.addEventListener('change', typePriceHouseChange);

  // синхронизация времени заезда и выезда
  var synchronInputs = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };

  dataTimeIn.addEventListener('change', function () {
    synchronInputs(dataTimeIn, dataTimeOut);
  });

  dataTimeOut.addEventListener('change', function () {
    synchronInputs(dataTimeOut, dataTimeIn);
  });

  //  Задание 20: доверяй, но проверяй. Часть 2 Рабочая ветка module8-task4
  // Синхронизация полей «Количество мест» и «Количество комнат»
  var capacityNumber = function (it) {
    capacityOptions.forEach(function (elem) {
      elem.selected = false;
      elem.disabled = true;
    });

    InitialPlaces[it].forEach(function (tit) {
      var capacitySel = capacitySelect.querySelector('option' + '[value="' + tit + '"]');
      capacitySel.disabled = false;
    });

    if (it > 10) {
      it = 0;
    }

    capacitySelect.querySelector('option' + '[value="' + it + '"]').selected = true;
  };

  var onRoomNumberSelectChange = function (evt) {
    evt.target.setCustomValidity('');
    var roomNum = evt.target.value;

    capacityNumber(roomNum);
  };

  var onCapacitySelectChange = function (evt) {
    evt.target.setCustomValidity('');
  };

  roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
  capacitySelect.addEventListener('change', onCapacitySelectChange);

  // При попытке отправить форму неверно заполненные поля подсвечиваются красной рамкой
  var inputValidate = function (evt) {
    var input = evt.target;

    if (input.checkValidity()) {
      input.style.boxShadow = 'none';
    } else {
      input.style.boxShadow = '0 0 2px 2px red';
    }
  };

  var inputInit = function () {
    window.util.adForm.querySelector('#title').addEventListener('input', inputValidate);
    window.util.adForm.querySelector('#price').addEventListener('input', inputValidate);

    window.util.adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
      if (!window.util.adForm.querySelector('#title').checkValidity() && !window.util.adForm.querySelector('#price').checkValidity()) {
        return;
      }
    });
  };

  window.form = {
    roomNumber: roomNumber,
    typePriceHouseChange: typePriceHouseChange,
    capacityNumber: capacityNumber,
    inputInit: inputInit
  };
})();
