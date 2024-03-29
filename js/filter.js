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

  //  Активируем <fieldset> формы с фильтрами - убираем атрибут disabled
  var activeMapFiltersFieldset = function () {
    window.util.mapFiltersFieldset.disabled = false;
  };

  //  Неактивное состояние <fieldset> формы с фильтрами
  var disableMapFiltersFieldset = function () {
    window.util.mapFiltersFieldset.disabled = true;
  };

  //  Состояние выбора дополнительных удобств в фильтрах при нажатии Enter
  var onFeaturesEnterDown = function (evt) {
    window.util.activateFeatures(evt);
    onFilterChange();
  };

  var activateFilterFeatures = function () {
    window.util.mapFiltersInput.forEach(function (item) {
      item.addEventListener('keydown', onFeaturesEnterDown);
    });
  };

  var deactivateFilterFeatures = function () {
    window.util.mapFiltersInput.forEach(function (item) {
      item.removeEventListener('keydown', onFeaturesEnterDown);
    });
  };

  //  Фильтрация по типу жилья
  var filtrationByType = function (item) {
    return typeSelect.value === 'any' || typeSelect.value === item.offer['type'].toString();
  };

  //  Фильтрация по цене за ночь
  var filtrationPrice = function (it) {
    var isPriceFiltered = PriceParameters[priceSelect.value];
    return it.offer.price >= isPriceFiltered.MIN && it.offer.price <= isPriceFiltered.MAX;
  };

  var filtrationByPrice = function (item) {
    return priceSelect.value === 'any' || filtrationPrice(item);
  };

  //  Фильтрация по числу комнат
  var filtrationByRooms = function (item) {
    return roomsSelect.value === 'any' || roomsSelect.value === item.offer['rooms'].toString();
  };

  //  Фильтрация по числу гостей
  var filtrationByGuests = function (item) {
    return guestsSelect.value === 'any' || guestsSelect.value === item.offer['guests'].toString();
  };

  //  Фильтрация по дополнительным удобствам
  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var changeFilters = function () {
    window.filteredData = window.util.ads.slice(0);

    window.filterData = window.filteredData.filter(function (item) {
      return filtrationByType(item) && filtrationByPrice(item) && filtrationByRooms(item) && filtrationByGuests(item) && filtrationByFeatures(item);
    });

    window.popup.removeCard();
    window.pin.remove();

    window.pin.filling(window.filterData);
  };

  var onFilterChange = function () {
    window.debounce(changeFilters);
  };

  var activateFilter = function () {
    changeFilters();

    activeMapFilters();

    //  Активируем все <input> формы с фильтрами - убираем атрибут disabled
    window.util.activateFields(window.util.mapFiltersInput);

    //  Активируем все <select> формы с фильтрами - убираем атрибут disabled
    window.util.activateFields(window.util.mapFiltersSelect);

    activeMapFiltersFieldset();

    window.util.mapFilters.addEventListener('change', onFilterChange);

    activateFilterFeatures();
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

    //  Неактивное состояние всех <input> формы с фильтрами
    window.util.deactivateFields(window.util.mapFiltersInput);

    //  Неактивное состояние всех <select> формы с фильтрами
    window.util.deactivateFields(window.util.mapFiltersSelect);

    deactivateFilterFeatures();

    disableMapFiltersFieldset();

    resetFilter();
    window.popup.removeCard();

    window.util.mapFilters.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    PINS_LIMIT: PINS_LIMIT,
    activate: activateFilter,
    deactivate: deactivateFilter
  };
})();
