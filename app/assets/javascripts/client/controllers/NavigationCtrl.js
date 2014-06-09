PDRClient.controller('NavigationCtrl', ['$scope', '$rootScope', 'SessionService', '$location',
    function($rootScope, $scope, SessionService, $location) {

      $scope.user = SessionService.getCurrentUser();

      $scope.updateTemplate = function() {
        SessionService.setUserTemplate(
          $scope,
          'client/views/navigation/navigation_user.html',
          'client/views/navigation/navigation_anon.html'
        );
      };
      $scope.locationHolder = '';
      $scope.updateTemplate();
      $scope.user = SessionService.getCurrentUser();

      $scope.$watch(function () { return $location.url(); }, function (url) {
        switch(url) {
          case '/assessments':
            return $scope.locationHolder = "currentStates";
          case '':
            return $scope.locationHolder = "home";
          default:
            return '';
        }
      })

      $scope.$on('session_updated', function() {
        $scope.updateTemplate();
      });
    }
]);
