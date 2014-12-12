angular.module("PDRClient").run(
  ['$rootScope', '$timeout',
  function ($rootScope, $timeout) {
    $rootScope.$on("$viewContentLoaded", function(){
      $timeout(function() {
        $('input, textarea').placeholder();
      });
    });
}]);
