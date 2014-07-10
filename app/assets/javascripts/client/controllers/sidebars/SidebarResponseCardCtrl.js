PDRClient.controller('SidebarResponseCardCtrl', [
  '$modal',
  '$scope',
  '$rootScope',
  '$stateParams',
  '$location',
  '$anchorScroll',
  '$timeout',
  'SessionService',
  'Score',
  'Consensus',
  'Assessment',
  function($modal, $scope, $rootScope, $stateParams, $location, $anchorScroll, $timeout, SessionService, Score, Consensus, Assessment) {
    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId   = $stateParams.response_id;
    $scope.questions = [];
    $scope.user      = SessionService.getCurrentUser();
    $scope.assessment = {};

    $timeout(function(){
      $scope.assessment = Assessment.get({id: $scope.assessmentId});
    });

    $scope.updateScores = function() {
      $scope.questions = Score.query({
        assessment_id: $scope.assessmentId,
        response_id:   $scope.responseId
      });
    };

    $scope.answeredQuestions = function() {
      var count = 0;
      angular.forEach($scope.questions, function(question) {
        if(question.score && question.score.value != null) count++;
      });

      return count;
    };

    $scope.unansweredQuestions = function() {
      return $scope.questions.length - $scope.answeredQuestions();
    }

    $scope.scrollTo = function(questionId) {
      $location.hash("question-" + questionId)
      $anchorScroll();
    };

    $scope.canSubmit = function() {
      return !$scope.isReadOnly;
    };

    $scope.isAssessment = function(){
      return $location.url().indexOf("responses") > -1;
    };

    $scope.subject = function() {
      if($scope.isAssessment()) return Assessment;
      return Consensus;
    };

    $scope.subject()
    .get({assessment_id: $scope.assessmentId, id: $scope.responseId})
    .$promise
    .then(function(data){
      $scope.isReadOnly = data.is_completed || false;
    });

    $scope.updateScores();

    $timeout(function(){
      $(".punchcard").affix();
    });

    $rootScope.$on('response_updated', function(){
      $scope.updateScores();
    });

    $scope.AssessmentMeetingDate = function() {
      if ($scope.assessment.due_date == null) { return 'TBD'};
      return moment($scope.assessment.due_date).format("MMM Do YY");
    }

    $scope.submitResponseModal = function() {
     $scope.modalInstance =  $modal.open({
        templateUrl: 'client/views/modals/response_submit_modal.html',
        scope: $scope
      });
    }

    $scope.cancel = function () {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.submitResponse = function() {
      $scope.modalInstance.dismiss('cancel');
      $rootScope.$broadcast('submit_response');
      $rootScope.$broadcast('submit_consensus');
    }
  }
]);
