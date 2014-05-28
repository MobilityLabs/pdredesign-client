PDRClient.controller('SidebarCtrl', ['$scope', 'SessionService',
    function($scope, SessionService) {
      $scope.user   = SessionService.getCurrentUser();
      if($scope.user) {
        $scope.visible = true;
        $scope.name   = $scope.user.full_name;
        $scope.avatar = $scope.user.avatar;
        $scope.role   = $scope.user.role;
      }
    }
]);
