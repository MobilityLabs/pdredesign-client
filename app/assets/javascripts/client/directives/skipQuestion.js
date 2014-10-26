PDRClient.directive('skipQuestion', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        question: "=",
        isConsensus: "=",
        isReadOnly: "@",
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

          $scope.answer = {value: null, content: null};

          $scope.skipped = function(question) {
            switch(true) {
              case !question || !question.score:
              case question.score == null:
              case question.score.value != null:
              case question.skipped == false:
              return false;
              case question.skipped:
              return true;
              default:
              return false;
            }
          };

          $scope.skipQuestion = function(question) {
            if($scope.isReadOnly) return;
            question.skipped = true;
            ResponseHelper.assignAnswerToQuestion($scope, $scope.answer, question);
          };

          $scope.skipQuestionSaveEvidence = function(score){
            if(score.evidence == null)
              score.evidence = '';
            score.editMode = true;
          };

        }]
    };
}]);
