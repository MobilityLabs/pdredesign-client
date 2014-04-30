PDRClient = angular.module("PDRClient", ['ngResource', 'ngRoute', 'ngSanitize', 'templates', 'ui.router']);

PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
      url: '/',
      views: {
        '': {
          controller: 'HomeCtrl',
          templateUrl: 'client/views/shared/include_template.html'
        },
      }
    })
    .state('logout', {
      url: '/logout',
      controller: ['$rootScope', '$scope', 'SessionService', '$location', 
        function($rootScope, $scope, SessionService, $location) {
          SessionService
            .logout()
            .then(function(){
              $rootScope.$broadcast('session_updated');
              $location.path('/');
            });
      }],
    })
    .state('login', {
      url: '/login',
      views: {
        '': {
          controller: 'LoginCtrl',
          templateUrl: 'client/views/login/login.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('settings', {
      url: '/settings',
      views: {
        '': {
          controller: 'SettingsCtrl',
          templateUrl: 'client/views/settings/settings.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    });
  }
]);
