'use strict';

(function () {
  var PINS_LIMIT = 5;

  var PriceParameters = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var typeSelect = window.util.mapFilters.querySelector('#housing-type');
  var priceSelect = window.util.mapFilters.querySelector('#housing-price');
  var roomsSelect = window.util.mapFilters.querySelector('#housing-rooms');
  var guestsSelect = window.util.mapFilters.querySelector('#housing-guests');
  var featuresFieldset = window.util.mapFilters.querySelector('#housing-features');

  window.filteredData = [];

  // Активируем форму с фильтрами - убираем класс ad-form--disabled у блока .map__filters
  var activeMapFilters = function () {
    window.util.mapFilters.classList.remove('ad-form--disabled');
  };

  //  Неактивное состояние формы с фильтрами
  var disableMapFilters = function () {
    window.util.mapFilters.classList.add('ad-form--disabled');
  };

  //  Активируем все <input> формы с фильтрами - убираем атрибут disabled
  var activeMapFiltersInput = function () {
    window.util.mapFiltersInput.forEach(function (input) {
      input.removeAttribute('disabled');
    });
  };

  //  Активируем все <select> формы с фильтрами - убираем атрибут disabled
  var activeMapFiltersSelect = function () {
    window.util.mapFiltersSelect.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  };

  //  Активируем <fieldset> формы с фильтрами - убираем атрибут disabled
  var activeMapFiltersFieldset = function () {
    window.util.mapFiltersFieldset.disabled = false;
  };

  //  Неактивное состояние всех <input> формы с фильтрами
  var disableMapFiltersInput = function () {
    window.util.mapFiltersInput.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });
  };

  //  Неактивное состояние всех <select> формы с фильтрами
  var disableMapFiltersSelect = function () {
    window.util.mapFiltersSelect.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  };

  //  Неактивное состояние <fieldset> формы с фильтрами
  var disableMapFiltersFieldset = function () {
    window.util.mapFiltersFieldset.disabled = true;
  };

  //  Фильтрация по типу жилья
  var filtrationByType = function (item) {
    var filtrItem = (typeSelect.value === 'any' || typeSelect.value === item.offer['type'].toString()) ? true : false;
    return filtrItem;
  };

  //  Фильтрация по цене за ночь
  var filtrationPrice = function (it) {
    var filteringPrice = PriceParameters[priceSelect.value];
    filteringPrice = (it.offer.price >= filteringPrice.MIN && it.offer.price <= filteringPrice.MAX) ? true : false;
    return filteringPrice;
  };

  var filtrationByPrice = function (item) {
    var priceItem = false;

    if (priceSelect.value === 'any' || filtrationPrice(item) === true) {
      priceItem = true;
    }

    return priceItem;
  };

  //  Фильтрация по числу комнат
  var filtrationByRooms = function (item) {
    var filteringRooms = (roomsSelect.value === 'any' || roomsSelect.value === item.offer['rooms'].toString()) ? true : false;
    return filteringRooms;
  };

  //  Фильтрация по числу гостей
  var filtrationByGuests = function (item) {
    var filteringGuests = (guestsSelect.value === 'any' || guestsSelect.value === item.offer['guests'].toString()) ? true : false;
    return filteringGuests;
  };

  //  Фильтрация по дополнительным удобствам
  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = function () {
    window.filteredData = window.util.ads.slice(0);

    window.filterData = window.filteredData.filter(function (item) {
      return filtrationByType(item) && filtrationByPrice(item) && filtrationByRooms(item) && filtrationByGuests(item) && filtrationByFeatures(item);
    });

    window.popup.removeCard();
    window.pin.removePins();

    window.pin.fillingPin(window.filterData);
  };

  var activateFilter = function () {
    onFilterChange();

    activeMapFilters();
    activeMapFiltersInput();
    activeMapFiltersSelect();
    activeMapFiltersFieldset();

    window.util.mapFilters.addEventListener('change', onFilterChange);
  };

  var resetFilter = function () {
    window.util.mapFiltersInput.forEach(function (input) {
      input.checked = false;
    });

    window.util.mapFiltersSelect.forEach(function (select) {
      select.value = 'any';
    });
  };

  var deactivateFilter = function () {
    disableMapFilters();
    disableMapFiltersInput();
    disableMapFiltersSelect();
    disableMapFiltersFieldset();

    resetFilter();
    window.popup.removeCard();

    window.util.mapFilters.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    PINS_LIMIT: PINS_LIMIT,
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter
  };
})();
