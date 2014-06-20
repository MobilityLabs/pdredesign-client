PDRClient.service('ResponseHelper',
  ['$q',
  'Score',
  function($q, Score) {
    this.answerCount = function(scores, questionId, answerValue) {
      var count = 0;
      angular.forEach(scores, function(score) {
        if(score.question_id != questionId) return false;
        if(score.value == answerValue)
          count++;
      });
      return count;
    };

    this.toggleAnswers = function(question) {
      question.answersVisible = !question.answersVisible;
    };

    this.answerTitle = function(value) {
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

    this.saveEvidence = function(score) {
      score.editMode = true;
    };

    this.editAnswer = function(score) {
      score.editMode = false;
    };

    this.assignAnswerToQuestion = function(scope, answer, question) {
      var params = {response_id: scope.responseId, assessment_id: scope.assessmentId};
      var score = {question_id: question.id, value: answer.value, evidence: question.score.evidence};
      question.loading = true;
      Score
        .save(params, score)
        .$promise
        .then(function(){
          scope.$emit('response_updated');
          question.loading = false;
          question.score.value = answer.value;
        });
    }

}]);
