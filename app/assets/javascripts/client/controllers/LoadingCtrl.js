PDRClient.controller('LoadingCtrl', ['$scope', 'SessionService',
    function($scope, SessionService) {
      $scope.$on('start_change', function(){
        $scope.loading = true;
      });

      $scope.$on('success_change', function(){
        $scope.loading = false;
      });
    }
]);
