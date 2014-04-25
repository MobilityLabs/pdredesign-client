PDRClient.directive('sidebar', ['SessionService',
    function(SessionService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        link: function(scope, elm, attrs) {
          SessionService.setUserTemplate(scope, 'client/views/directives/sidebar.html', '');
        },
        template: "<ng-include src='template'></ng-include>"
      }
    }
]);
