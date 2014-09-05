PDRClient.service('ResponseHelper',
  ['$q',
  'Score',
  function($q, Score) {
    var scope = this;

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

    this.saveEvidence = function(answer, question) {
      if(question.score.evidence == null)
        question.score.evidence = '';
      question.score.editMode = true;

      scope.assignAnswerToQuestion(scope, answer, question);
    };

    this.editAnswer = function(score) {
      score.editMode = false;
    };

    this.assignAnswerToQuestion = function(scope, answer, question) {

      var params = {response_id: scope.responseId, assessment_id: scope.assessmentId};
      var score  = {question_id: question.id, value: answer.value, evidence: question.score.evidence};

      question.loading = true;
      Score
        .save(params, score)
        .$promise
        .then(function(){
          scope.$emit('response_updated');
          question.loading = false;
          question.isAlert = false;
          question.score.value = answer.value;
        });
    }

    this.skipQuestion = function(question){
      question.skipped = true

      var answer = {value: null}
      scope.assignAnswerToQuestion(scope, answer, question);
    };

    this.skipped = function(question) {
      switch(true) {
        case !question || !question.score:
          return false;
        case question.score.value == null && question.score.evidence != null:
          return true;
        case question.skipped:
          return true;
        default:
          return false;
      }
    }


}]);
