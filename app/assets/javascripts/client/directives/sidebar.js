PDRClient.directive('sidebar', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/sidebar.html',
        link: function(scope, elm, attrs) {

        }
      }
    }
]);
