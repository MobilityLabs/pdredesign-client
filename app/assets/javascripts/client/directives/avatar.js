PDRClient.directive('avatar', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/avatar.html',
        link: function(scope, elm, attrs) {
          scope.avatar = attrs.avatar;
          scope.name   = attrs.name;
          scope.role   = attrs.role;
          scope.title  = "<p class='name'>" + scope.name + "</p><p class='role'>" + scope.role + "</p>";
          scope.elm    = elm;
        },
        controller: ['$scope', '$rootScope', '$location', '$timeout',
          function($scope, $rootScope, $location, $timeout) {
            $timeout(function() {
              $scope.elm.find("img").tooltip();
            });
        }],

      }
    }
]);
