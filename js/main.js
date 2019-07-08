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

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGTH = 62;
var MIN = {
  X: LOCATION_X_MIN,
  Y: 130 - (MAIN_PIN_HEIGTH + MAIN_PIN_HEIGTH_AFTER)
};
var MAX = {
  X: LOCATION_WIDTH - MAIN_PIN_WIDTH,
  Y: 630 - (MAIN_PIN_HEIGTH + MAIN_PIN_HEIGTH_AFTER)
};
var isActive = false;

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
  var addressY = mapPinMain.offsetTop + mapPinMain.offsetHeight / 2;
  address = {x: addressX, y: addressY};
  var addressCoordinates = (parseInt(address.x, 10) + ', ' + parseInt(address.y, 10));

  adForm.querySelector('#address').setAttribute('value', addressCoordinates);
};

//  Элементы управления формы неактивны в исходном состоянии
var initialState = function () {
  initialCoordinatesAddress();

  document.querySelector('.map').classList.add('map--faded');
  document.querySelector('.ad-form').classList.add('ad-form--disabled');

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

  typePriceHouseChange();

  capacityNumber(roomNumber);

  inputInit();

  isActive = true;
};

// Координаты метки объявления после активации страницы (пин с учетом острой стрелочки)
var coordinatesAddress = function (left, top) {
  var address = {};
  var addressX = left + MAIN_PIN_WIDTH / 2;
  var addressY = top + (MAIN_PIN_HEIGTH + MAIN_PIN_HEIGTH_AFTER);
  address = {x: addressX, y: addressY};
  var addressCoordinates = (parseInt(address.x, 10) + ', ' + parseInt(address.y, 10));

  adForm.querySelector('#address').setAttribute('value', addressCoordinates);
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
mapPinMain.addEventListener('mousedown', function (evt) {
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

    var left = mapPinMain.offsetLeft - shift.x;
    var top = mapPinMain.offsetTop - shift.y;

    //  Проверяем соблюдение границ карты
    var mainPinPosition = {
      x: setBordersMap(MIN.X, MAX.X, parseInt(left, 10)),
      y: setBordersMap(MIN.Y, MAX.Y, parseInt(top, 10))
    };

    mapPinMain.style.left = mainPinPosition.x + 'px';
    mapPinMain.style.top = mainPinPosition.y + 'px';

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

// Выбор минимальной цены по типу жилья
var typePriceHouseChange = function () {
  var viewPrice = adForm.querySelector('#price');

  var priceType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  viewPrice.min = priceType[housingType.value];
  viewPrice.placeholder = priceType[housingType.value];
};

var housingType = adForm.querySelector('#type');
housingType.addEventListener('change', typePriceHouseChange);

// синхронизация времени заезда и выезда
var dataTimeIn = adForm.querySelector('#timein');
var dataTimeOut = adForm.querySelector('#timeout');

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
var InitialPlaces = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

var capacityOptions = capacitySelect.querySelectorAll('option');

var roomNumber = roomNumberSelect.querySelector('option' + '[selected]').value;

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

  adForm.querySelector('#title').addEventListener('input', inputValidate);
  adForm.querySelector('#price').addEventListener('input', inputValidate);

  adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
    if (!adForm.querySelector('#title').checkValidity() && !adForm.querySelector('#price').checkValidity()) {
      return;
    }
  });
};
