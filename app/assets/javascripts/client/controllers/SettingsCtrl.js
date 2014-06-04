PDRClient.controller('SettingsCtrl', ['$scope', 'User', 'SessionService', 'UrlService',
    function($scope, User, SessionService, UrlService) {
      $scope.user    = {};
      $scope.user    = User.get();
      $scope.errors  = null;
      $scope.success = null;

      $scope.update = function(editedUser) {
        editedUser["district_ids[]"] = editedUser.district_ids;

        editedUser
          .$save()
          .then(
            function(data) {
              $scope.success = "Your profile has been updated"
            },
            function(response) {
              $scope.errors  = response.data.errors
            }
          );
      };

    }
]);
