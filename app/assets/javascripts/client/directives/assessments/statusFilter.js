PDRClient.directive('statusFilter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/assessments/filters/status-filter.html',
      scope: {
        assessments: '=',
      },
      controller: [
        '$scope',
        '$timeout',
        function($scope, $timeout) {

          $scope.statuses = function(assessments) {
            var statuses = [];
            angular.forEach(assessments, function(assessment, key){
              if(statuses.indexOf(assessment.status) == -1)
                statuses.push(assessment.status);
            });

            return statuses;
          };

        }]
    };
}]);
