PDRClient.directive('consensusscoring', [
  function() {
  return {
    require: '^responsequestion',
    restrict: 'E',
    replace: true,

    templateUrl: 'client/views/directives/consensus_scoring.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;
    },

  //   controller: ['$scope', '$rootScope', '$location', '$timeout',
  //     function($scope, $rootScope, $location, $timeout) {
  //       $timeout(function() {
  //       });
  //     }],
  }
}
]);
