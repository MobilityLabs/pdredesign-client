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

          $scope.viewModes = [
                              {label: "Numeric", icon: 'fa-sort-numeric-asc'}, 
                              {label: "Variance", icon: 'fa-bar-chart-o'}, 
                              {label: "Popularity", icon: 'fa-fire'}, 
                              {label: "Buzz", icon: 'fa-comments'}
                             ];
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

          $scope.sortByPopularity = function(categories) {
            var tmpObject = {};
            var keys      = [];

            angular.forEach(categories, function(category, _key) {
              angular.forEach(category.questions, function(question, key) {
                if(typeof tmpObject[question.popularity] == 'undefined')
                  tmpObject[question.popularity] = {"name": question.popularity, "questions": []};
                keys.push(question.popularity);
                tmpObject[question.popularity]["questions"].push(question);
              });
            });

            keys
              .sort()
              .reverse();

            var sorted    = {};
            angular.forEach(keys, function(key) { sorted[key] = tmpObject[key]; });

            return sorted;
          };

          $scope.sortByBuzz = function(categories) {
            var tmpObject = {};
            var keys      = [];

            angular.forEach(categories, function(category, _key) {
              angular.forEach(category.questions, function(question, key) {
                if(typeof tmpObject[question.buzz] == 'undefined')
                  tmpObject[question.buzz] = {"name": question.buzz, "questions": []};
                keys.push(question.buzz);
                tmpObject[question.buzz]["questions"].push(question);
              });
            });

            keys
              .sort()
              .reverse();

            var sorted    = {};
            angular.forEach(keys, function(key) { sorted[key] = tmpObject[key]; });

            return sorted;
          };

          $scope.changeViewMode = function(mode) {
            switch(mode.toLowerCase()) {
              case 'numeric':
                $scope.viewMode = $scope.viewModes[0];
                $scope.categories = $scope.sortByNumeric();          
                break;
              case 'variance':
                $scope.viewMode = $scope.viewModes[1];
                $scope.categories = $scope.sortByVariance($scope.data);                
                break;
              case 'popularity':
                $scope.viewMode = $scope.viewModes[2];
                $scope.categories = $scope.sortByPopularity($scope.data);
                break;
              case 'buzz':
                $scope.viewMode = $scope.viewModes[3];
                $scope.categories = $scope.sortByBuzz($scope.data);              
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
              });
          });

        }]
    };
}]);
