PDRClient.directive('modeanswer', [
  function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      scores: '@',
      responses: '@',
      value: '@',
      modeanswer: '@'
    },

    templateUrl: 'client/views/directives/mode_answer.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;

    },

    controller: ['$scope', '$rootScope', '$location', '$timeout',
      function($scope, $rootScope, $location, $timeout) {
        $timeout(function() {
          if ($scope.modeanswer == "true") {
            $scope.elm.addClass("scored-1}}");
          };
        });
      }],
  }
}
]);
