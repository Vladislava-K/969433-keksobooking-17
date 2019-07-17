'use strict';

(function () {
  var PINS_LIMIT = 5;

  var typeSelect = window.util.mapFilters.querySelector('#housing-type');

  window.filteredData = [];

  // Активируем форму с фильтрами - убираем класс ad-form--disabled у блока .map__filters
  var activeMapFilters = function () {
    window.util.mapFilters.classList.remove('ad-form--disabled');
  };

  //  Неактивное состояние форму с фильтрами
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

  var filtrationByType = function (item) {
    var filtrItem = (typeSelect.value === 'any' || typeSelect.value === item.offer['type'].toString()) ? true : false;
    return filtrItem;
  };

  var onFilterChange = function () {
    window.filteredData = window.util.ads.slice(0);

    window.filterData = window.filteredData.filter(filtrationByType);

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

    window.util.mapFilters.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    PINS_LIMIT: PINS_LIMIT,
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter
  };
})();
