PDRClient.directive('userLogin', ['SessionService',
    function(SessionService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/user_login.html',
        controller: ['$scope', '$location', 
          function($scope, $location) {
            $scope.email    = null; 
            $scope.password = null; 

            $scope.authenticate = function(email, password) {
              SessionService.authenticate(email, password)
                .then(function(user) {
                  $location.path('/');
                });
            }
          }],
      }
    }
]);
