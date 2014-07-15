PDRClient.controller('SettingsCtrl', ['$scope', '$timeout', 'User', 'SessionService', 'UrlService',
    function($scope, $timeout, User, SessionService, UrlService) {
     
      $scope.user    = {};
      $scope.user    = User.get();
      $scope.errors  = null;
      $scope.success = null;

      $scope.isNetworkPartner = function() { 
        return SessionService.isNetworkPartner();
      };

      $scope.update = function(editedUser) {
        editedUser["district_ids"] = $scope.selectedDistrict;

        editedUser
          .$save()
          .then(
            function(data) {
              $scope.success    = "Your profile has been updated"
              SessionService.syncUser();
            },
            function(response) {
              $scope.errors  = response.data.errors
            }
          );
      };

    }
]);
