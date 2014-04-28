PDRClient.controller('NavigationCtrl', ['$scope', '$rootScope', 'SessionService',
    function($rootScope, $scope, SessionService) {

      $scope.updateTemplate = function() {
        SessionService.setUserTemplate(
          $scope, 
          'client/views/navigation/navigation_user.html', 
          'client/views/navigation/navigation_anon.html'
        );
      };

      $scope.updateTemplate();

      $rootScope.$on('user_logged_in', function() {
        $scope.updateTemplate();
      });
    }
]);
