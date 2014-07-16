PDRClient.controller('DistrictMessageCtrl', ['$scope',
    '$modal',
    '$stateParams',
    'SessionService',
    'DistrictMessage',
    function($scope, $modal, $stateParams, SessionService, DistrictMessage) {
      $scope.message  = {};
      
      $scope.sendMessage = function(message) {
        $scope.success = null;
        $scope.errors  = null;

        DistrictMessage
          .save(message)
          .$promise
          .then(function(data) {
              $scope.success = "Thank you!"
            }, function(response) {
              $scope.errors  = response.data.errors
            }
          );

      };

    }
]);
