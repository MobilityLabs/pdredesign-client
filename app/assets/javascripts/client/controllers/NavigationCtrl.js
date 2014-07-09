PDRClient.controller('NavigationCtrl', ['$scope', '$rootScope', 'SessionService', '$location',
    function($rootScope, $scope, SessionService, $location) {

      $scope.$watch('user', function() {
        if($scope.user == null) return;
        $scope.userAvatar = $scope.user.avatar;
      });

      $scope.updateTemplate = function() {
        SessionService.setUserTemplate(
          $scope,
          'client/views/navigation/navigation_user.html',
          'client/views/navigation/navigation_anon.html'
        );
      };
      $scope.updateTemplate();
      $scope.user = SessionService.getCurrentUser();

      $scope.currentLocation = '';
      $scope.activeClassFor = function(location) {
        if($scope.currentLocation == location)
          return 'active';
        return '';
      };

      $scope.$watch(function () { return $location.url(); }, function (url) {
        switch(url) {
          case '/assessments':
            return $scope.currentLocation = "current_state";
          case '':
            return $scope.currentLocation = "home";
          default:
            return '';
        }
      });

      $scope.$on('session_updated', function() {
        $scope.updateTemplate();
        $scope.userAvatar = $scope.user.avatar;
      });
    }
]);
