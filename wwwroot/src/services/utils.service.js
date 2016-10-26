(function() {
  'use strict';

  angular
  .module('Usuarios')
  .service('utilService', utilService);

  /** @ngInject */
  function utilService($log) {

    var service = {
      diasEntre: diasEntre,
    };

    return service;

    function treatAsUTC(date) {
      var result = new Date(date);
      result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
      return result;
    }

    function diasEntre(startDate, endDate) {
      var millisecondsPerDay = 24 * 60 * 60 * 1000;
      return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }

  }
})();
