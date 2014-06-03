PDRClient.directive('consensusScoring', [
  function() {
  return {
    require: '^consensus',
    restrict: 'E',
    replace: true,

    templateUrl: 'client/views/directives/consensus_scoring.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;
    },

  }
}
]);
