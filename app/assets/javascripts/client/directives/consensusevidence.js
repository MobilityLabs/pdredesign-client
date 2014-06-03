PDRClient.directive('consensusevidence', [
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

    templateUrl: 'client/views/directives/consensus_evidence_show.html',
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
