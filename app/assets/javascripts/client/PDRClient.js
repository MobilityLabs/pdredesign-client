PDRClient = angular.module("PDRClient", [
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'templates',
  'angular-redactor',
  'angularMoment',
  'ui.utils',
  'ui.router',
  'ui.bootstrap']);

angular.module("PDRClient").run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state       = $state;
    $rootScope.$stateParams = $stateParams;
});

angular.module("PDRClient").run([
  '$rootScope',
  '$state',
  '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$on('$stateChangeStart', function() {
      $rootScope.$broadcast('start_change');
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.$broadcast('success_change');
    });
}]);
