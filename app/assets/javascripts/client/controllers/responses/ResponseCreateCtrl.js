PDRClient.controller('ResponseCreateCtrl', ['$modal', '$timeout', '$scope', '$location', 'SessionService', 'Response', '$stateParams', 'Assessment',
  function($modal, $timeout, $scope, $location, SessionService, Response, $stateParams, Assessment) {
    $scope.isError  = null;

    $scope.assessmentId = $stateParams.assessment_id;

    $scope.getAssessment = function(){
      return Assessment.get({id: $scope.assessmentId});
    };

    $scope.createResponse = function(assessmentId, rubric_id) {
      Response
      .save({assessment_id: assessmentId},  {rubric_id: rubric_id})
      .$promise
      .then(function(response){
        $location.path('/assessments/'+ $scope.assessmentId +'/responses/' + response.id);
      }, function(data){

        $scope.isError = true
        $scope.notification  = "Response was not created.";
        $modal.open({
          templateUrl: 'client/views/shared/notification_modal.html',
          scope: $scope.errors
        });
      });
    };

    $timeout(function(){
      $scope.getAssessment()
        .$promise
        .then(function(assessment){
          $scope.createResponse($scope.assessmentId, assessment.rubric_id)
        });
    });
  }
]);
