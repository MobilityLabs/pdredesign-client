PDRClient.controller('GrantAccessCtrl', ['$scope', '$stateParams', '$state', 'Access',
    function($scope, $stateParams, $state, Access) {
      Access
        .save({token: $stateParams.token, action: 'grant'}, null)
        .$promise
        .then(function(){
          $state.go('assessments');
        });
    }
]);
