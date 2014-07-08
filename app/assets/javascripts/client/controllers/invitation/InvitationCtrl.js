PDRClient.controller('InvitationCtrl', ['$scope', '$location', '$stateParams', 'Invitation', 'SessionService',
    function($scope, $location, $stateParams, Invitation, SessionService) {
      $scope.token        = $stateParams.token;
      $scope.invitedUser  = Invitation.get({token: $scope.token});
      $scope.inviteObject = {}
      $scope.isError = null;
      $scope.errors   = null;
      $scope.showalert = false;
      $scope.alerts = [];

      $scope.showError = function(msg) {
        $scope.alerts.push({type: 'danger', msg: msg});
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };


      $scope.redeemInvite = function() {
        $scope.inviteObject = {
          first_name: $scope.invitedUser.first_name,
          last_name:  $scope.invitedUser.last_name,
          password:   $scope.invitedUser.password,
          email:      $scope.invitedUser.email,
        };
        Invitation
          .save({token: $scope.token}, $scope.inviteObject)
          .$promise
          .then(function() {
            $location.url('/login');
          }, function(response){
            var errors = response.data.errors;
            angular.forEach(errors, function(error, key) {
              angular.forEach(error, function(e) {
                var message = key + ": " + e;
                $scope.showError(message);
              });
           });

          });
      };
    }
]);
