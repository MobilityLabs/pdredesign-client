PDRClient.controller('SignupCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  'User',
  'SessionService',
    function($scope, $rootScope, $location, User, SessionService) {
      $scope.user = {}

      $scope.districts  = function(){
        return $("#districts:first").val();
      };

      $scope.login = function(user) {
        SessionService
        .authenticate(user.email, user.password)
        .then(function(user) {
          $location.path('/');
          $rootScope.$broadcast('session_updated');
        });
      };

      $scope.createUser = function(user) {
        user.district_ids = $scope.districts();

        $scope.success = null;
        $scope.errors  = null;

        User
          .create(user)
          .$promise
          .then(function(data) {
              $scope.success = "User created"
              $scope.login(user);
            }, function(response) {
              $scope.errors  = response.data.errors
            }
          );
      };
    }
]);
