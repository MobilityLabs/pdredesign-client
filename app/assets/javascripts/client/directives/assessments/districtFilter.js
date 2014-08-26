PDRClient.directive('districtFilter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/assessments/filters/district-filter.html',
      scope: {
        assessments: '=',
      },
      controller: [
        '$scope',
        '$timeout',
        function($scope, $timeout) {

          $scope.districts = function(assessments) {
            var districts = [];
            angular.forEach(assessments, function(assessment, key){
              if(districts.indexOf(assessment.district_name) == -1)
                districts.push(assessment.district_name);
            });

            return districts;
          };

        }]
    };
}]);
