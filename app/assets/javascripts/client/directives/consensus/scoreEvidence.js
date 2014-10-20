PDRClient.directive('scoreEvidence', [
  function() {
    return {
      restrict: 'E',
      transclusion: true,
      scope: {
        scores:  '=',
        question:  '=',
      },
      templateUrl: 'client/views/shared/responses/evidence.html',

    };
}]);
