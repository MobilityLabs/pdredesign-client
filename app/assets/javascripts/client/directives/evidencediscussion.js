PDRClient.directive('evidenceDiscussion', [
  function() {
  return {
    require: '^consensus',
    restrict: 'E',
    replace: true,
    templateUrl: 'client/views/directives/evidence_discussion.html'

  };
}
]);
