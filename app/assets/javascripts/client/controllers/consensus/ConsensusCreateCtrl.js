PDRClient.controller('ConsensusCreateCtrl', ['$scope', '$location', 'SessionService', 'Consensus', '$stateParams',
    function($scope, $location, SessionService, Consensus, $stateParams) {
      window.stuff = $scope;
      $scope.assessmentId = $stateParams.assessment_id;
      $scope.responseId   = $stateParams.response_id;
      Consensus
        .create({assessment_id: $scope.assessmentId}, {})
        .$promise
        .then(function(response){
          $location.path('/assessments/35/consensus/' + response.id)
          console.debug(response);
        }); 
    }
]);
