PDRClient.directive('consensus', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        assessmentId:  '@',
        responseId:    '@',},
      templateUrl: 'client/views/directives/response_question.html',
      controller: [
        '$scope',
        '$timeout',
        '$stateParams',
        '$location',
        'SessionService',
        'Consensus',
        'Score',
        function($scope, $timeout, $stateParams, $location, SessionService, Consensus, Score) {

          $scope.isConsensus = true;
          $scope.isReadOnly  = true;

          $scope.toggleAnswers = function(question) {
            question.answersVisible = !question.answersVisible;
          };

          $scope.toggleCategoryAnswers = function(category) {
            angular.forEach(category.questions, function(question, key) {
              $scope.toggleAnswers(question);
            });
          };

          $scope.saveEvidence = function(score) {
            score.editMode = true;
          };

          $scope.editAnswer = function(score) {
            score.editMode = false;
          };

          $scope.assignAnswerToQuestion = function(answer, question) {
            if($scope.isReadOnly) return false;
            var params = {response_id: $scope.responseId, assessment_id: $scope.assessmentId};
            var score = {question_id: question.id, value: answer.value, evidence: question.score.evidence};

            question.loading = true;

            Score
              .save(params, score)
              .$promise
              .then(function(){
                $scope.$emit('response_updated');
                question.loading = false;
                question.score.value = answer.value;
              });
          };

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
          };

          $scope.viewModes = [{label: "Category"}, {label: "Variance"}];
          $scope.viewMode  = $scope.viewModes[0];

          $scope.sortByCategory = function() {
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

            keys.sort();

            var sorted    = {};
            angular.forEach(keys, function(key) { sorted[key] = tmpObject[key]; });

            return sorted;
          };

          $scope.changeViewMode = function(mode) {
            switch(mode.toLowerCase()) {
              case 'variance':
                $scope.categories = $scope.sortByVariance($scope.data);
                break;
              case 'category':
                $scope.categories = $scope.sortByCategory();
                break;
            }
          };

          $scope.$on('submit_response', function() {
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
