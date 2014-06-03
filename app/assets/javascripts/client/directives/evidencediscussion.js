PDRClient.directive('evidencediscussion', [
  function() {
  return {
    require: '^responsequestion',
    restrict: 'E',
    replace: true,

    templateUrl: 'client/views/directives/evidence_discussion.html',
    link: function(scope, elm, attrs) {
      scope.elm    = elm;
    },

    controller: ['$scope', '$rootScope', '$location', '$timeout',
      function($scope, $rootScope, $location, $timeout) {
        $timeout(function() {
        });
      }],
  }
}
]);
