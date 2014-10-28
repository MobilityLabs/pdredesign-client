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

    this.saveEvidence = function(score) {
      score.editMode = true;
    };

    this.editAnswer = function(score) {
      score.editMode = false;
    };

    this.skipped = function(question, answer) {
      switch(true) {
        case !question || !question.score:
        case question.score == null:
        case question.score.value != null:
        case question.skipped == false:
        return false;
        case question.skipped:
        case question.score.value == null && question.score.evidence != null:
        return true;
        default:
        return false;
      }
    }

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

    this.questionColor = function(question) {
      if(!question || !question.score) return null;
      if(question.score.value == null && question.score.evidence != null) {
        return 'skipped';
      }
      return 'scored-' + question.score.value;
    }

    this.percentageByResponse = function(scores, questionId, answerValue, answers_count){
      var numberOfAnswers = scope.answerCount(scores, questionId, answerValue);
      return ((numberOfAnswers*100)/answers_count) + '%';
    }

}]);
