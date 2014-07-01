PDRClient.directive('inviteUser', ['SessionService', 'UrlService', '$timeout',
    function(SessionService, UrlService, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/invite_user.html',
        scope: {
          'assessmentId': '@'
        },
        controller: ['$scope', '$modal', 'UserInvitation', function($scope, $modal, UserInvitation) {

          $scope.alerts  = [];
          $scope.addAlert = function(message) {
            $scope.alerts.push({type: 'danger', msg: message});
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };

          $scope.showInviteUserModal = function() {
            $scope.modalInstance = $modal.open({
              templateUrl: 'client/views/modals/invite_user.html',
              scope: $scope
            });
          };

          $scope.sendInvite = function(userObject) {
            UserInvitation
              .create({assessment_id: $scope.assessmentId}, userObject)
              .$promise
              .then(function() {
                $scope.$emit('update_participants');
                $scope.modalInstance.dismiss('cancel');
              }, function(response){ 
                var errors = response.data.errors;
                angular.forEach(errors, function(error, field) { 
                  $scope.addAlert(field + " : " + error);
                });

              });
          };

        }],
     }
}]);
