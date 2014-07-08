PDRClient.controller('SidebarCtrl', ['$scope', '$modal', 'SessionService',
    function($scope, $modal, SessionService) {
      $scope.user   = SessionService.getCurrentUser();
      if($scope.user) {
        $scope.visible = true;
        $scope.name   = $scope.user.full_name;
        $scope.avatar = $scope.user.avatar;
        $scope.role   = $scope.user.role;
      }

      $scope.pdrOverview  = function() {
        $scope.modal = $modal.open({
          templateUrl: 'client/views/modals/pdr_overview.html',
          scope: $scope
        });
      };

      $scope.close = function() {
        $scope.modal.dismiss('cancel');
      }

    }

]);
