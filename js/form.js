'use strict';

(function () {
  var InitialPlaces = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var VALUE_ROOMS_COMPARED = 10;

  var roomNumberSelect = window.util.adForm.querySelector('#room_number');
  var capacitySelect = window.util.adForm.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var roomNumber = roomNumberSelect.querySelector('option' + '[selected]').value;

  var viewPrice = window.util.adForm.querySelector('#price');

  var MinPriceTypes = {
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

  //  Состояние выбора дополнительных удобств в форме объявления при нажатии Enter
  var onFeaturesFormEnterDown = function (evt) {
    window.util.activateFeatures(evt);
  };

  var activateFormFeatures = function () {
    window.util.adFormFieldsetInput.forEach(function (item) {
      item.addEventListener('keydown', onFeaturesFormEnterDown);
    });
  };

  var deactivateFormFeatures = function () {
    window.util.adFormFieldsetInput.forEach(function (item) {
      item.removeEventListener('keydown', onFeaturesFormEnterDown);
    });
  };

  // Выбор минимальной цены по типу жилья
  var onTypePriceHouseChange = function () {
    viewPrice.min = MinPriceTypes[housingType.value];
    viewPrice.placeholder = MinPriceTypes[housingType.value];
  };

  // Синхронизация времени заезда и выезда
  var synchronizateInputs = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };

  var onSynchronizateTimeInChange = function () {
    synchronizateInputs(dataTimeIn, dataTimeOut);
  };

  var onSynchronizateTimeOutChange = function () {
    synchronizateInputs(dataTimeOut, dataTimeIn);
  };

  //  Задание 20: доверяй, но проверяй. Часть 2 Рабочая ветка module8-task4
  // Синхронизация полей «Количество мест» и «Количество комнат»
  var getCapacityNumber = function (valueSelectable) {
    capacityOptions.forEach(function (elem) {
      elem.selected = false;
      elem.disabled = true;
    });

    InitialPlaces[valueSelectable].forEach(function (valueAvailable) {
      var capacitySel = capacitySelect.querySelector('option' + '[value="' + valueAvailable + '"]');
      capacitySel.disabled = false;
    });

    if (valueSelectable > VALUE_ROOMS_COMPARED) {
      valueSelectable = 0;
    }

    capacitySelect.querySelector('option' + '[value="' + valueSelectable + '"]').selected = true;
  };

  var onRoomNumberSelectChange = function (evt) {
    evt.target.setCustomValidity('');
    var roomNum = evt.target.value;

    getCapacityNumber(roomNum);
  };

  var onCapacitySelectChange = function (evt) {
    evt.target.setCustomValidity('');
  };

  // При попытке отправить форму неверно заполненные поля подсвечиваются красной рамкой
  var onInputValidate = function (evt) {
    var input = evt.target;

    if (input.checkValidity()) {
      input.style.boxShadow = 'none';
    } else {
      input.style.boxShadow = '0 0 2px 2px red';
    }
  };

  var inputInit = function () {
    viewTitle.addEventListener('input', onInputValidate);
    viewPrice.addEventListener('input', onInputValidate);

    window.util.adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
      if (!viewTitle.checkValidity() && !viewPrice.checkValidity()) {
        return;
      }
    });
  };

  var onAdFormSubmit = function (evt) {
    window.backend.save(new FormData(window.util.adForm), function () {
      window.popup.renderSuccessMessage();

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

    window.util.mapFilters.reset();

    window.util.mapPinMain.style.left = window.map.LOCATION_PIN_LEFT + 'px';
    window.util.mapPinMain.style.top = window.map.LOCATION_PIN_TOP + 'px';

    window.map.getInitialState();
    onTypePriceHouseChange();
    getCapacityNumber(roomNumber);
  };

  var onResetBtnPage = function (evt) {
    evt.preventDefault();
    resetPage();
  };

  var activateForm = function () {
    activeAdForm();

    //  Активируем все <input> формы заполнения информации об объявлении - убираем атрибут disabled
    window.util.activateFields(window.util.adFormInput);

    //  Активируем все <select> формы заполнения информации об объявлении - убираем атрибут disabled
    window.util.activateFields(window.util.adFormSelect);

    //  Активируем все <fieldset> формы заполнения информации об объявлении - убираем атрибут disabled
    window.util.activateFields(window.util.adFormFieldset);

    onTypePriceHouseChange();
    getCapacityNumber(roomNumber);
    inputInit();

    activateFormFeatures();

    window.image.activate();

    housingType.addEventListener('change', onTypePriceHouseChange);

    dataTimeIn.addEventListener('change', onSynchronizateTimeInChange);
    dataTimeOut.addEventListener('change', onSynchronizateTimeOutChange);

    roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
    capacitySelect.addEventListener('change', onCapacitySelectChange);
    window.util.adForm.addEventListener('submit', onAdFormSubmit);
    resetBtn.addEventListener('click', onResetBtnPage);
  };

  var deactivateForm = function () {
    disableAdForm();

    //  Неактивное состояние всех <input> формы
    window.util.deactivateFields(window.util.adFormInput);

    //  Неактивное состояние всех <select> формы
    window.util.deactivateFields(window.util.adFormSelect);

    //  Неактивное состояние всех <fieldset> формы
    window.util.deactivateFields(window.util.adFormFieldset);

    window.image.deactivate();
    window.image.remove();

    deactivateFormFeatures();

    viewTitle.removeEventListener('input', onInputValidate);
    viewPrice.removeEventListener('input', onInputValidate);

    housingType.removeEventListener('change', onTypePriceHouseChange);

    dataTimeIn.removeEventListener('change', onSynchronizateTimeInChange);
    dataTimeOut.removeEventListener('change', onSynchronizateTimeOutChange);

    roomNumberSelect.removeEventListener('change', onRoomNumberSelectChange);
    capacitySelect.removeEventListener('change', onCapacitySelectChange);
    window.util.adForm.removeEventListener('submit', onAdFormSubmit);
    resetBtn.removeEventListener('click', onResetBtnPage);
  };

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
