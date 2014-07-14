PDRClient.controller('LoadingCtrl', ['$scope', 'SessionService',
    function($scope, SessionService) {
      $scope.$on('start_change', function() {
        $('.loading-state')
          .height($(document).height());

        $scope.loading = true;
      });

      $scope.$on('success_change', function() {
        $scope.loading = false;
      });
    }
]);
