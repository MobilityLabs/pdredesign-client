PDRClient.directive('avatar', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/avatar.html',
        link: function(scope, elm, attrs) {
          scope.avatar = attrs.avatar;
          scope.tooltip = attrs.tooltip;
          scope.style = attrs.style;
          scope.toolplacement = attrs.toolplacement
          scope.width = attrs.width;
          scope.imgclass = attrs.imgclass;
          scope.name   = attrs.name;
          scope.role   = attrs.role;
          scope.title  = "<p class='name'>" + scope.name + "</p><p class='role'>" + scope.role + "</p>";
          scope.elm    = elm;
        },

        controller: ['$scope', '$rootScope', '$location', '$timeout',
          function($scope, $rootScope, $location, $timeout) {

              $timeout(function() {
                if ($scope.tooltip == "true") {
                  $scope.elm.find("img").tooltip();
                };

              });
        }],

      }
    }
]);
