PDRClient.directive('responsequestion', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'client/views/directives/response_question.html',
      link: function(scope, element, attrs) {
        scope.assessmentId = attrs.assessmentId;
        scope.responseId   = attrs.responseId;
      },
      controller: [
        '$scope',
        '$timeout',
        '$stateParams',
        'SessionService',
        'Response',
        'Score',
        'ResponseHelper',
        function($scope, $timeout, $stateParams, SessionService, Response, Score, ResponseHelper) {

          $scope.toggleAnswers = ResponseHelper.toggleAnswers
          $scope.saveEvidence = ResponseHelper.saveEvidence
          $scope.editAnswer = ResponseHelper.editAnswer
          $scope.answerTitle = ResponseHelper.answerTitle

          $scope.invalidEvidence = function (question) {
            return question.score.evidence == null ||  question.score.evidence  == '';
          }

          $scope.assignAnswerToQuestion = function (answer, question) {
            ResponseHelper.assignAnswerToQuestion($scope, answer, question);
          }

          $timeout(function(){
            Response
              .get({assessment_id: $scope.assessmentId, id: $scope.responseId})
              .$promise
              .then(function(data){
                $scope.categories = data.categories;
              });
          });

        }]
    }
}]);
