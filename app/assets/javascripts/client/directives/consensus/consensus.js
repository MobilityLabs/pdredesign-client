PDRClient.directive('consensus', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        assessmentId:  '@',
        responseId:    '@',},
      templateUrl: 'client/views/directives/consensus_question.html',
      controller: [
        '$scope',
        '$timeout',
        '$stateParams',
        '$location',
        'SessionService',
        'Consensus',
        'Score',
        'ResponseHelper',
        function($scope, $timeout, $stateParams, $location, SessionService, Consensus, Score, ResponseHelper) {

          $scope.isConsensus = true;
          $scope.isReadOnly  = true;

          $scope.toggleCategoryAnswers = function(category) {
            category.toggled = !category.toggled;
            angular.forEach(category.questions, function(question, key) {
              $scope.toggleAnswers(question);
            });
          };

          $scope.answerCount   = ResponseHelper.answerCount;
          $scope.skipCount     = ResponseHelper.skipCount;
          $scope.toggleAnswers = ResponseHelper.toggleAnswers;
          $scope.saveEvidence  = ResponseHelper.saveEvidence;
          $scope.editAnswer    = ResponseHelper.editAnswer;
          $scope.answerTitle   = ResponseHelper.answerTitle;

          $scope.assignAnswerToQuestion = function (answer, question) {
            switch(true) {
              case $scope.isReadOnly:
                return false;
              case !question || !question.score:
              case question.score.evidence == null || question.score.evidence == '':
                question.isAlert = true;
                return false;
            }
            
            ResponseHelper.assignAnswerToQuestion($scope, answer, question);
          }

          $scope.viewModes = [{label: "Numeric"}, {label: "Variance"}, {label: "Popularity"}, {label: "Buzz"}];
          $scope.viewMode  = $scope.viewModes[0];

          $scope.sortByNumeric = function() {
            return $scope.data;
          };

          $scope.sortByVariance = function(categories) {
            var tmpObject = {};
            var keys      = [];

            angular.forEach(categories, function(category, _key) {
              angular.forEach(category.questions, function(question, key) {
                if(typeof tmpObject[question.variance] == 'undefined')
                  tmpObject[question.variance] = {"name": question.variance, "questions": []};
                keys.push(question.variance);
                tmpObject[question.variance]["questions"].push(question);
              });
            });

            keys
              .sort()
              .reverse();

            var sorted    = {};
            angular.forEach(keys, function(key) { sorted[key] = tmpObject[key]; });

            return sorted;
          };

          $scope.sortByPopularity = function(scores) {
            return $scope.data;
          };

          $scope.sortByBuzz = function(scores) {
            return $scope.data;
          };

          $scope.changeViewMode = function(mode) {
            switch(mode.toLowerCase()) {
              case 'numeric':
                $scope.viewMode = 'numeric'
                $scope.categories = $scope.sortByNumeric();          
                break;
              case 'variance':
                $scope.viewMode = 'variance';
                $scope.categories = $scope.sortByVariance($scope.data);                
                break;
              case 'popularity':
                $scope.viewMode = 'popularity';
                $scope.categories = $scope.sortByNumeric();
                break;
              case 'buzz':
                $scope.viewMode = 'buzz';
                $scope.categories = $scope.sortByNumeric();              
                break;
            }
          };

          $scope.$on('submit_consensus', function() {
            Consensus
              .submit({assessment_id: $scope.assessmentId, id: $scope.responseId}, {submit: true})
              .$promise
              .then(function(data){
                $location.path('/assessments');
              });
          });

          $timeout(function(){
            Consensus
              .get({assessment_id: $scope.assessmentId, id: $scope.responseId})
              .$promise
              .then(function(data) {
                $scope.scores     = data.scores;
                $scope.data       = data.categories;
                $scope.categories = data.categories;
                $scope.isReadOnly = data.is_completed || false;
                $scope.participantCount = data.participant_count;
                $scope.viewMode = 'numeric';
              });
          });

        }]
    };
}]);
