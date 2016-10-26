(function() {
  'use strict';

  angular
    .module('Usuarios', [ 'ui.router', 'ui.bootstrap','angularSpinner'])
    .config(routerConfig)
    .run(runBlock);

  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'mainController',
        controllerAs:'main'
      });

    $urlRouterProvider.otherwise('/');

  }

    function runBlock($log) {


    $log.debug('runBlock end');
  }

})();
