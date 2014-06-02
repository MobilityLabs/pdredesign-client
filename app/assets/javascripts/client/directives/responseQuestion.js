PDRClient.directive('responsequestion', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'client/views/directives/consensus.html',
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
        function($scope, $timeout, $stateParams, SessionService, Response, Score) {
          $scope.toggleAnswers = function(question) {
            question.answersVisible = !question.answersVisible
          };

          $scope.saveEvidence = function(score) {
            score.editMode = true
          };

          $scope.editAnswer = function(score) {
            score.editMode = false
          };

          $scope.assignAnswerToQuestion = function(answer, question) {
            var params = {response_id: $scope.responseId, assessment_id: $scope.assessmentId};
            var score = {question_id: question.id, value: answer.value, evidence: answer.evidence};
            question.loading = true;
            Score
              .save(params, score)
              .$promise
              .then(function(){
                $scope.$emit('response_updated');
                question.loading = false;
                question.score.value = answer.value;
              });
          }

          $scope.answerTitle = function(value) {
            switch(value) {
              case 1:
                return 'Non-Existent';
              case 2:
                return 'Initial';
              case 3:
                return 'Defined & Managed';
              case 4:
                return 'Optimizing';
            }
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
