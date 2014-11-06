PDRClient.controller('ConsensusShowCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'SessionService',
    'Assessment',
    'ConsensusHelper',
    '$stateParams',
    function($scope, $http, $timeout, SessionService, Assessment, ConsensusHelper, $stateParams) {
      $scope.user = SessionService.getCurrentUser();

      $scope.assessmentId = $stateParams.assessment_id;
      $scope.responseId   = $stateParams.response_id;
      $scope.assessment   = Assessment.get({id: $scope.assessmentId});
      
      $scope.exportToPDF  = function(){
        ConsensusHelper.consensuToPDF($scope.assessment, $scope.responseId, $scope.teamRole);
      };

      $scope.exportToCSV  = function(){
        ConsensusHelper.consensuToCSV($scope.assessment, $scope.responseId);
      };
    }
]);
