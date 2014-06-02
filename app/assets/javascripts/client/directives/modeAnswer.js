PDRClient.directive('modeanswer', [
  function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      scores: '@',
      responses: '@',
      scorevalue: '@',
      answervalue: '@',
      coloranswervalue: '@'

    },

    templateUrl: 'client/views/directives/mode_answer.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;
    },

    controller: ['$scope', '$rootScope', '$location', '$timeout',
      function($scope, $rootScope, $location, $timeout) {
        $timeout(function() {
          if ($scope.answervalue ==  $scope.scorevalue) {
            $scope.elm.addClass($scope.coloranswervalue);
          };
        });
      }],
  }
}
]);
