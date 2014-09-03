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
  'Response',
  'Assessment',
  function($modal, $scope, $rootScope, $stateParams, $location,
           $anchorScroll, $timeout, SessionService, Score,
           Consensus, Response, Assessment) {

    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId   = $stateParams.response_id;
    $scope.questions    = [];
    $scope.assessment   = {};

    $timeout(function(){
      $scope.assessment = Assessment.get({id: $scope.assessmentId});
      $scope.subject()
        .get({assessment_id: $scope.assessmentId, id: $scope.responseId})
        .$promise
        .then(function(data){
          $scope.isReadOnly = data.is_completed || false;
      });

      $(".punchcard").affix();
      $scope.updateScores();
    });

    $scope.questionScoreValue = function(question) {
      if(question.score.value == null && question.score.evidence != null) {
        return 'skipped';
      }
      return question.score.value;
    };

    $scope.updateScores = function() {
      Score.query({
        assessment_id: $scope.assessmentId,
        response_id:   $scope.responseId
      }).$promise
      .then(function(questions) {
        $scope.questions = questions;
      });
    };

    $rootScope.$on('response_updated', function(){
      $scope.updateScores();
    });

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

    $scope.isResponse = function(){
      return $location.url().indexOf("responses") > -1;
    };

    $scope.canSubmit = function() {
      if($scope.isResponse()) return true;
      return !$scope.isReadOnly;
    };

    $scope.isResponseCompleted = function() {
      return $scope.isReadOnly;
    };

    $scope.subject = function() {
      if($scope.isResponse()) return Response;
      return Consensus;
    };

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
