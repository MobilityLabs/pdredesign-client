PDRClient.controller('AssessmentDashboardSidebarCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;

      $scope.assessment = Assessment.get({id: $scope.id});

      $scope.meetingDateDaysAgo = function() {
        return moment().diff($scope.assessment.meeting_date, 'days');
      }

      $scope.postMeetingDate = function() {
        return moment().isAfter($scope.assessment.meeting_date);
      }

      $scope.preMeetingDate = function() {
        return moment().isBefore($scope.assessment.meeting_date);
      }

      $scope.noMeetingDate = function() {
        return $scope.assessment.meeting_date == null;
      }

      $scope.reportPresent = function() {
        return $scope.assessment.submitted_at !== null;
      }

      $scope.meetingDayNumber = function() {
        return moment($scope.assessment.meeting_date).format("D");
      }

      $scope.meetingDayName = function() {
          return moment($scope.assessment.meeting_date).format("dddd");
      }

      $scope.meetingMonthName = function() {
          return moment($scope.assessment.meeting_date).format("MMM");
      }

    }
]);


