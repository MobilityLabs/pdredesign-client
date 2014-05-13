PDRClient.controller('AssessmentDashboardSidebarCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;

      $scope.assessment = Assessment.get({id: $scope.id});

      $scope.meetingDayNumber = function(date) {
        if (date !== null) {
          return moment(date).format("D");
        }
      }

      $scope.meetingDayName = function(date) {
        if (date !== null) {
          return moment(date).format("dddd");
        }
      }

      $scope.meetingMonthName = function(date) {
        if (date !== null) {
          return moment(date).format("MMM");
        }
      }

    }
]);


