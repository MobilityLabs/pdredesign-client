PDRClient.directive('startAssessment', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/start-assessment.html',
        link: function(scope, elm, attrs) {

        }
      }
    }
]);
