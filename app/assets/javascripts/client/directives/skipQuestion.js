PDRClient.directive('skipQuestion', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        question: "=",
        responseId: "@",
        assessmentId: "@",
      },
      templateUrl: 'client/views/shared/responses/skip_question.html',
      controller: [
        '$scope',
        '$timeout',
        'ResponseHelper',
        function($scope, $timeout, ResponseHelper) {
          $scope.editAnswer = ResponseHelper.editAnswer;
          $scope.skipped    = ResponseHelper.skipped;

          $scope.skipQuestion = function(question, score){
            question.skipped = true;

            var answer = { value: null };
            ResponseHelper.assignAnswerToQuestion($scope, answer, question);
          };

          $scope.skipQuestionSaveEvidence = function(score){
            if(score.evidence == null)
              score.evidence = '';
            score.editMode = true;
          };

        }]
    };
}]);
