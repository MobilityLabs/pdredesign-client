PDRClient.controller('InvitationCtrl', ['$scope', '$location', '$stateParams', 'Invitation', 'SessionService', 
    function($scope, $location, $stateParams, Invitation, SessionService) {
      $scope.token        = $stateParams.token;
      $scope.invitedUser  = Invitation.get({token: $scope.token});
      $scope.redeemInvite = function() {
        var inviteObject = {
          first_name: $scope.invitedUser.first_name,
          last_name:  $scope.invitedUser.last_name,
          password:   $scope.invitedUser.password,
          email:      $scope.invitedUser.email,
        };
        Invitation
          .save({token: $scope.token}, inviteObject)
          .$promise
          .then(function() {
            $location.url('/login');
          });
      };
    }
]);
