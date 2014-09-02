PDRClient.directive('homeSidebar', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/sidebar/sidebar_redesign.html',
      scope: {},
      controller: [
        '$scope',
        '$timeout',
        '$stateParams',
        'SessionService',
        '$modal',
        function($scope, $timeout, $stateParams, SessionService, $modal) {

          $scope.user     = SessionService.getCurrentUser();
          $scope.redirect = $stateParams.redirect;

          if($scope.user) {
            $scope.visible = true;
            $scope.name   = $scope.user["full_name"];
            $scope.avatar = $scope.user["avatar"];
            $scope.role   = $scope.user["role_human"];
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

        }]
    };
}]);
