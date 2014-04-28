PDRClient.directive('userLogin', ['SessionService',
    function(SessionService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/user_login.html',
        controller: ['$scope', '$rootScope', '$location', 
          function($scope, $rootScope, $location) {
            $scope.email    = null; 
            $scope.password = null; 

            $scope.authenticate = function(email, password) {
              SessionService.authenticate(email, password)
                .then(function(user) {
                  $location.path('/');
                  $rootScope.$broadcast('user_logged_in');
                });
            }
          }],
      }
    }
]);
