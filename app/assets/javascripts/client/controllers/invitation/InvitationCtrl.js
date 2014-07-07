PDRClient.controller('InvitationCtrl', ['$scope', '$location', '$stateParams', 'Invitation', 'SessionService',
    function($scope, $location, $stateParams, Invitation, SessionService) {
      $scope.token        = $stateParams.token;
      $scope.invitedUser  = Invitation.get({token: $scope.token});
      $scope.inviteObject = {}
      $scope.isError = null;
      $scope.errors   = null;
      $scope.showalert = false;
      $scope.alerts = [];

      $scope.showError = function() {
        $scope.alerts.push({type: 'danger', msg: 'Invalid email or password!'});
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
          }, function(data){
              console.log(data)
              $scope.showError();

          });
      };
    }
]);
