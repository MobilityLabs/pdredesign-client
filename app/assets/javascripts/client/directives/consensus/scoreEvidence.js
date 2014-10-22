PDRClient.directive('scoreEvidence', [
  function() {
    return {
      restrict: 'E',
      transclusion: true,
      scope: {
        scores:  '=',
        questionId:  '@',
      },
      templateUrl: 'client/views/shared/responses/evidence.html',

    };
}]);
