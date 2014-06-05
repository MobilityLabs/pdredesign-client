PDRClient.controller('SidebarResponseCardCtrl', [
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
  function($scope, $rootScope, $stateParams, $location, $anchorScroll, $timeout, SessionService, Score, Consensus, Assessment) {
    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId   = $stateParams.response_id;
    $scope.questions = [];
    $scope.user      = SessionService.getCurrentUser();

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

    $scope.scrollTo = function(questionId) {
      $location.hash("question-" + questionId)
      $anchorScroll();
    };

    $scope.canSubmit = function() {
      return !$scope.isReadOnly;
    };

    $scope.isAssessment = function(){
      $location.url().indexOf("responses") > -1
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

    $scope.submitResponse = function() {
      $rootScope.$broadcast('submit_response');
    }
  }
]);
