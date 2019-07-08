'use strict';

(function () {
  var LOCATION_X_MIN = 0;
  var LOCATION_WIDTH = 1200;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGTH = 62;
  var MAIN_PIN_HEIGTH_AFTER = 22;

  var MIN = {
    X: LOCATION_X_MIN,
    Y: 130
  };
  var MAX = {
    X: LOCATION_WIDTH - MAIN_PIN_WIDTH,
    Y: 630
  };

  var isActive = false;

  // координаты метки объявления до активации страницы
  var initialCoordinatesAddress = function () {
    var address = {};
    var addressX = window.util.mapPinMain.offsetLeft + window.util.mapPinMain.offsetWidth / 2;
    var addressY = window.util.mapPinMain.offsetTop + window.util.mapPinMain.offsetHeight / 2;
    address = {x: addressX, y: addressY};
    var addressCoordinates = (parseInt(address.x, 10) + ', ' + parseInt(address.y, 10));

    window.util.adForm.querySelector('#address').setAttribute('value', addressCoordinates);
  };

  //  Элементы управления формы неактивны в исходном состоянии
  var initialState = function () {
    initialCoordinatesAddress();

    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    window.util.adFormInput.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    window.util.adFormSelect.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    document.querySelector('.map__filters').classList.add('map__filters--disabled');

    window.util.mapFiltersInput.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    window.util.mapFiltersSelect.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  };

  initialState();

  //  Перевод страницы Букинга в активный режим
  var activeState = function () {
    window.pin.fillingPin();

    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.util.adFormInput.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    window.util.adFormSelect.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    document.querySelector('.map__filters').classList.remove('map__filters--disabled');

    window.util.mapFiltersInput.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    window.util.mapFiltersSelect.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    window.form.typePriceHouseChange();

    window.form.capacityNumber(window.form.roomNumber);

    window.form.inputInit();

    isActive = true;
  };

  // Координаты метки объявления после активации страницы (пин с учетом острой стрелочки)
  var coordinatesAddress = function (left, top) {
    var address = {};
    var addressX = left + MAIN_PIN_WIDTH / 2;
    var addressY = top + (MAIN_PIN_HEIGTH + MAIN_PIN_HEIGTH_AFTER);
    address = {x: addressX, y: addressY};
    var addressCoordinates = (parseInt(address.x, 10) + ', ' + parseInt(address.y, 10));

    window.util.adForm.querySelector('#address').setAttribute('value', addressCoordinates);
  };

  //  Описываем полный цикл Drag-and-drop для маркера
  // Устанавливаем границы
  var setBordersMap = function (min, max, current) {
    var value = current;
    if (current <= min) {
      value = min;
      return value;
    }
    if (current >= max) {
      value = max;
      return value;
    }
    return value;
  };

  // Тащим за mapPinMain и обрабатываем событие начала перетаскивания метки mousedown
  window.util.mapPinMain.addEventListener('mousedown', function (evt) {
    activatePinDown(evt);
  });

  var activatePinDown = function (evt) {
    evt.preventDefault();

    //  Запомним координаты точки начала движения
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // При каждом движении мыши обновляем смещение относительно первоначальной точки, чтобы диалог смещался на необходимую величину.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var left = window.util.mapPinMain.offsetLeft - shift.x;
      var top = window.util.mapPinMain.offsetTop - shift.y;

      //  Проверяем соблюдение границ карты
      var mainPinPosition = {
        x: setBordersMap(MIN.X, MAX.X, parseInt(left, 10)),
        y: setBordersMap(MIN.Y, MAX.Y, parseInt(top, 10))
      };

      window.util.mapPinMain.style.left = mainPinPosition.x + 'px';
      window.util.mapPinMain.style.top = mainPinPosition.y + 'px';

      coordinatesAddress(mainPinPosition.x, mainPinPosition.y);
    };

    // При отпускании кнопки мыши страница переходит в активный режим и нужно переставать слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!isActive) {
        activeState();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Добавим обработчики события передвижения мыши и отпускания кнопки мыши.
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.map = {
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_WIDTH: LOCATION_WIDTH,
    isActive: isActive
  };
})();
