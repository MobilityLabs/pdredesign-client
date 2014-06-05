PDRClient.controller('ConsensusShowCtrl', [
    '$scope',
    '$timeout',
    'SessionService',
    'Assessment',
    '$stateParams',
    function($scope, $timeout, SessionService, Assessment, $stateParams) {
      $scope.user = SessionService.getCurrentUser();

      $scope.assessmentId = $stateParams.assessment_id;
      $scope.responseId   = $stateParams.response_id;
    }
]);
