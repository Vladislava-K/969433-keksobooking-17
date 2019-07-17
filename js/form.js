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

  var viewPrice = window.util.adForm.querySelector('#price');

  var priceType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var viewTitle = window.util.adForm.querySelector('#title');

  var housingType = window.util.adForm.querySelector('#type');

  var dataTimeIn = window.util.adForm.querySelector('#timein');
  var dataTimeOut = window.util.adForm.querySelector('#timeout');

  var resetBtn = document.querySelector('.ad-form__reset');

  //  Активируем форму заполнения информации об объявлении - убираем класс ad-form--disabled у блока .ad-form
  var activeAdForm = function () {
    window.util.adForm.classList.remove('ad-form--disabled');
  };

  //  Неактивное состояние формы
  var disableAdForm = function () {
    window.util.adForm.classList.add('ad-form--disabled');
  };

  //  Активируем все <input> формы заполнения информации об объявлении - убираем атрибут disabled
  var activeAdFormInput = function () {
    window.util.adFormInput.forEach(function (input) {
      input.removeAttribute('disabled');
    });
  };

  //  Активируем все <select> формы заполнения информации об объявлении - убираем атрибут disabled
  var activeAdFormSelect = function () {
    window.util.adFormSelect.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  };

  //  Активируем все <fieldset> формы заполнения информации об объявлении - убираем атрибут disabled
  var activeAdFormFieldset = function () {
    window.util.adFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  //  Неактивное состояние всех <input> формы
  var disableAdFormInput = function () {
    window.util.adFormInput.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });
  };

  //  Неактивное состояние всех <select> формы
  var disableAdFormSelect = function () {
    window.util.adFormInput.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  };

  //  Неактивное состояние всех <fieldset> формы
  var disableAdFormFieldset = function () {
    window.util.adFormInput.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  // Выбор минимальной цены по типу жилья
  var typePriceHouseChange = function () {
    viewPrice.min = priceType[housingType.value];
    viewPrice.placeholder = priceType[housingType.value];
  };

  // синхронизация времени заезда и выезда
  var synchronInputs = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };

  var synchronTimeIn = function () {
    synchronInputs(dataTimeIn, dataTimeOut);
  };

  var synchronTimeOut = function () {
    synchronInputs(dataTimeOut, dataTimeIn);
  };

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
    viewTitle.addEventListener('input', inputValidate);
    viewPrice.addEventListener('input', inputValidate);

    window.util.adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
      if (!viewTitle.checkValidity() && !viewPrice.checkValidity()) {
        return;
      }
    });
  };

  var onAdFormSubmit = function (evt) {
    window.backend.save(new FormData(window.util.adForm), function () {
      window.popup.renderPopupSuccess();

      resetPage();
    }, window.popup.renderErrorMessage);
    evt.preventDefault();
  };

  var resetPage = function () {
    window.util.adForm.reset();
    viewTitle.value = '';
    viewPrice.value = '';
    viewTitle.style.boxShadow = 'none';
    viewPrice.style.boxShadow = 'none';
    resetBtn.style.boxShadow = 'none';

    window.util.mapFilters.reset();

    window.util.mapPinMain.style.left = window.map.LOCATION_PIN_LEFT + 'px';
    window.util.mapPinMain.style.top = window.map.LOCATION_PIN_TOP + 'px';

    window.map.initialState();
    typePriceHouseChange();
    capacityNumber(roomNumber);
  };

  var resetBtnPage = function (evt) {
    evt.preventDefault();
    resetPage();
  };

  var activateForm = function () {
    activeAdForm();
    activeAdFormInput();
    activeAdFormSelect();
    activeAdFormFieldset();
    typePriceHouseChange();
    capacityNumber(roomNumber);
    inputInit();

    housingType.addEventListener('change', typePriceHouseChange);

    dataTimeIn.addEventListener('change', synchronTimeIn);
    dataTimeOut.addEventListener('change', synchronTimeOut);

    roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
    capacitySelect.addEventListener('change', onCapacitySelectChange);
    window.util.adForm.addEventListener('submit', onAdFormSubmit);
    resetBtn.addEventListener('click', resetBtnPage);
  };

  var deactivateForm = function () {
    disableAdForm();
    disableAdFormInput();
    disableAdFormSelect();
    disableAdFormFieldset();

    housingType.removeEventListener('change', typePriceHouseChange);

    dataTimeIn.removeEventListener('change', synchronTimeIn);
    dataTimeOut.removeEventListener('change', synchronTimeOut);

    roomNumberSelect.removeEventListener('change', onRoomNumberSelectChange);
    capacitySelect.removeEventListener('change', onCapacitySelectChange);
    window.util.adForm.removeEventListener('submit', onAdFormSubmit);
    resetBtn.removeEventListener('click', resetBtnPage);
  };

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
