PDRClient = angular.module("PDRClient", ['ngResource', 'ngRoute', 'ngSanitize', 'templates']);

PDRClient.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'client/views/home.html'
    });
  }
]);
