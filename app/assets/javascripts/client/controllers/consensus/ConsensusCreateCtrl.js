PDRClient.controller('ConsensusCreateCtrl', ['$scope', '$timeout', '$location', 'SessionService', 'Consensus', '$stateParams',
  function($scope, $timeout, $location, SessionService, Consensus, $stateParams) {
    $scope.errors  = null;

    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId   = $stateParams.response_id;

    $scope.createConsensus = function() {
      Consensus
        .create({assessment_id: $scope.assessmentId}, {})
        .$promise
        .then(function(response){
          $location.path('/assessments/'+ $scope.assessmentId +'/consensus/' + response.id)
      }, function(data){
        $scope.errors  = "Response was not created.";

      });
    };

    $timeout(function(){
      $scope.createConsensus();
    });

  }
]);

