PDRClient.directive('modeAnswer', [
  function() {
  return {
    require: '^consensus',
    restrict: 'E',
    replace: true,

    templateUrl: 'client/views/directives/mode_answer.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;
    },

    controller: ['$scope', '$rootScope', '$location', '$timeout',
      function($scope, $rootScope, $location, $timeout) {
        $timeout(function() {
          if ($scope.answer.value == $scope.question.score.value) {
            $scope.elm.addClass("scored-" + $scope.answer.value);
          };
        });
      }],
  }
}
]);
