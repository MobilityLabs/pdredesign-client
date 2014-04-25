PDRClient.controller('NavigationCtrl', ['$scope', 'SessionService',
    function($scope, SessionService) {
      $scope.template = 'client/views/navigation/navigation_anon.html';

      if(SessionService.getUserAuthenticated()) {
        $scope.template = 'client/views/navigation/navigation_user.html';
      }

    }
]);
