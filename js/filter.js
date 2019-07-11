'use strict';

(function () {
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

  var activateFilter = function () {
    activeMapFilters();
    activeMapFiltersInput();
    activeMapFiltersSelect();
  };

  var deactivateFilter = function () {
    disableMapFilters();
    disableMapFiltersInput();
    disableMapFiltersSelect();
  };

  window.filter = {
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter
  };
})();
